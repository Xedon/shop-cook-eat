import {
  gql,
  makeExtendSchemaPlugin,
  makePluginByCombiningPlugins,
  makeWrapResolversPlugin,
} from "postgraphile";
import { OAuth2Client } from "google-auth-library";
import { GraphQLError } from "graphql";
import { ContextType } from "..";

const permissionsPlugin = makeWrapResolversPlugin(
  (ctx) => {
    if (
      (ctx.scope.isRootMutation || ctx.scope.isRootQuery) &&
      ctx.scope.fieldName !== "register_userByGoogleIdToken" &&
      ctx.scope.fieldName !== "refreshToken"
    ) {
      return ctx.scope.fieldName;
    }
    // return null to not wrap this non-root resolver
    return null;
  },
  (_) => async (resolve, source, args, context: ContextType, info) => {
    await context.verifyAuthToken();

    return resolve(source, args, context, info);
  }
);

const googleAuthPlugin = makeExtendSchemaPlugin((_) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);
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
              audience: process.env.GOOGLE_CLIENT_KEY,
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
