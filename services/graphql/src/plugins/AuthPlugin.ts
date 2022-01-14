import {
  gql,
  makeExtendSchemaPlugin,
  makePluginByCombiningPlugins,
  makeWrapResolversPlugin,
} from "postgraphile";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { GraphQLError } from "graphql";
import cookie from "cookie";
import { IncomingMessage } from "http";
import { ServerResponse } from "http";
import { addDays } from "date-fns";
import { FastifyInstance } from "fastify";

declare module "postgraphile" {
  interface PostGraphileOptions {
    auth: {
      googleClientKey: string;
    };
  }
}

const permissionsPlugin = makeWrapResolversPlugin(
  (ctx) => {
    if (
      (ctx.scope.isRootMutation || ctx.scope.isRootQuery) &&
      ctx.scope.fieldName !== "registerUserByGoogleIdToken" &&
      ctx.scope.fieldName !== "refreshToken"
    ) {
      return ctx.scope.fieldName;
    }
    // return null to not wrap this non-root resolver
    return null;
  },
  (_) => async (resolve, source, args, context: ContextType, info) => {
    context.verifyAuthToken();

    return resolve(source, args, context, info);
  }
);

const googleAuthPlugin = makeExtendSchemaPlugin((_, options) => {
  const client = new OAuth2Client(options.GOOGLE_CLIENT_KEY);
  return {
    typeDefs: gql`
      input GoogleLoginInput {
        idToken: String!
      }

      type TokenPayload {
        authToken: String!
        refreshToken: String!
      }

      extend type Mutation {
        registerUserByGoogleIdToken(input: GoogleLoginInput!): TokenPayload
      }
    `,
    resolvers: {
      Mutation: {
        registerUserByGoogleIdToken: async (
          _query,
          { input: { idToken } }: { input: { idToken: string } },
          context: ContextType
        ) => {
          const { setAuthCookies, signAuthToken, signRefreshToken } = context;

          async function verify() {
            const ticket = await client.verifyIdToken({
              idToken,
              audience: options.GOOGLE_CLIENT_KEY,
            });

            const payload = ticket.getPayload();

            if (!payload?.email_verified) {
              throw new GraphQLError(
                "Google user is not verified",
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                { verify: "USER_NOT_VERIFIED" }
              );
            }

            const authToken = signAuthToken(payload);
            const refreshToken = signRefreshToken(payload);

            const tokens = {
              authToken,
              refreshToken,
            };

            setAuthCookies(tokens);

            return tokens;
          }
          return verify().catch((error) => {
            if (error instanceof GraphQLError) {
              return error;
            }

            throw new GraphQLError(
              "Token is invallid",
              undefined,
              undefined,
              undefined,
              undefined,
              error,
              { verify: "TOKEN_INVALLID" }
            );
          });
        },
      },
    },
  };
});

const refreshTokenPlugin = makeExtendSchemaPlugin((_) => {
  return {
    typeDefs: gql`
      input RefreshTokenInput {
        refreshToken: String!
      }

      extend type Mutation {
        refreshToken(input: RefreshTokenInput!): TokenPayload
      }
    `,
    resolvers: {
      Mutation: {
        refreshToken: async (
          _query,
          { input: { refreshToken } }: { input: { refreshToken: string } },
          { signAuthToken, setAuthCookies, verifyRefreshToken }: ContextType
        ) => {
          const payload = verifyRefreshToken(refreshToken);

          const authToken = signAuthToken(payload);

          const tokens = {
            authToken,
            refreshToken,
          };

          setAuthCookies(tokens);

          return tokens;
        },
      },
    },
  };
});

export const AuthPlugin = makePluginByCombiningPlugins(
  permissionsPlugin,
  googleAuthPlugin,
  refreshTokenPlugin
);

const cleanTokenPayload = ({
  aud,
  exp,
  iat,
  iss,
  at_hash,
  azp,
  email_verified,
  hd,
  nonce,
  profile,
  ...rest
}: TokenPayload) => ({ ...rest });

const createAdditionalContext = (
  req: IncomingMessage,
  res: ServerResponse,
  fastify: FastifyInstance
) => ({
  signAuthToken: (payload: TokenPayload) =>
    fastify.jwt.sign(cleanTokenPayload(payload), {
      ...fastify.jwt.options.sign,
      expiresIn: "1d",
    }),
  signRefreshToken: (payload: TokenPayload) =>
    fastify.jwt.sign(cleanTokenPayload(payload), {
      ...fastify.jwt.options.sign,
      expiresIn: "7d",
      sub: "refreshToken",
    }),
  decodeJwt: (token: string) =>
    fastify.jwt.decode<TokenPayload>(token, fastify.jwt.options.decode),
  verifyAuthToken: () => {
    const token = fastify.parseCookie(req?.headers?.cookie ?? "")?.auth;
    return fastify.jwt.verify<TokenPayload>(token, fastify.jwt.options.verify);
  },
  verifyRefreshToken: (token: string) =>
    fastify.jwt.verify<TokenPayload>(token, {
      ...fastify.jwt.options.verify,
      allowedSub: "refreshToken",
    }),
  setAuthCookies: ({
    authToken,
    refreshToken,
  }: {
    authToken: string;
    refreshToken: string;
  }) => {
    res.setHeader("Set-Cookie", [
      cookie.serialize("auth", authToken, {
        expires: addDays(new Date(), 1),
        secure: true,
        sameSite: "strict",
      }),
      cookie.serialize("auth_refresh", refreshToken, {
        expires: addDays(new Date(), 7),
        secure: true,
        sameSite: "strict",
      }),
    ]);
  },
});

export type ContextType = ReturnType<typeof createAdditionalContext>;

export const additionalGraphQLContextFromRequest = (fastify: FastifyInstance) =>
  async function (req: IncomingMessage, res: ServerResponse) {
    return createAdditionalContext(req, res, fastify);
  };
