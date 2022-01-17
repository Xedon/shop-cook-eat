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
import { PoolClient } from "pg";
import {
  insertGoogleAccoutEntry,
  insertTokenEntry,
  selectIsGoogleTokenUsed,
} from "src/querys";
import { AuthErrors, buildError } from "src/errors";

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
  const loginOrRegisterUserByGoogleIdToken =
    (registration: boolean) =>
    async (
      _: any,
      { input: { idToken } }: { input: { idToken: string } },
      context: ContextType & { pgClient: PoolClient }
    ) => {
      const { setAuthCookies, signAuthToken, signRefreshToken, pgClient } =
        context;

      const isTokenUsed = await selectIsGoogleTokenUsed(pgClient, {
        idToken,
      });

      if (isTokenUsed) {
        throw buildError(AuthErrors.TOKEN_INVALLID);
      }

      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken,
          audience: options.GOOGLE_CLIENT_KEY,
        });

        const payload = ticket.getPayload();

        if (!payload?.email_verified) {
          throw buildError(AuthErrors.USER_NOT_VERIFIED);
        }

        if (!payload.name || !payload.email) {
          throw buildError(AuthErrors.INFORMATIONS_NOT_SUFFICIENT);
        }

        const authToken = signAuthToken(payload);
        const refreshToken = signRefreshToken(payload);

        const tokens = {
          authToken,
          refreshToken,
        };

        setAuthCookies(tokens);

        if (registration) {
          await insertGoogleAccoutEntry(pgClient, {
            googleId: payload.iss,
            name: payload.name,
            email: payload.email,
            profilePictureUrl: payload.picture ?? null,
          });
        }

        await insertTokenEntry(pgClient, { idToken });

        return tokens;
      }
      return verify().catch((error) => {
        if (error instanceof GraphQLError) {
          return error;
        }

        throw buildError(AuthErrors.TOKEN_INVALLID);
      });
    };

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
        loginUserByGoogleIdToken(input: GoogleLoginInput!): TokenPayload
        registerUserByGoogleIdToken(input: GoogleLoginInput!): TokenPayload
      }
    `,
    resolvers: {
      Mutation: {
        loginUserByGoogleIdToken: loginOrRegisterUserByGoogleIdToken(false),
        registerUserByGoogleIdToken: loginOrRegisterUserByGoogleIdToken(true),
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
