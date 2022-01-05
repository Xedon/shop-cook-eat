import { gql, makeExtendSchemaPlugin } from "postgraphile";
import { OAuth2Client } from "google-auth-library";
import { GraphQLError } from "graphql";
import { ContextType } from "..";

export const GoogleLoginPlugin = makeExtendSchemaPlugin((build) => {
  const sql = build.pgSql;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);
  return {
    typeDefs: gql`
      input GoogleLoginInput {
        idToken: String!
      }

      input RefreshTokenInput {
        refreshToken: String!
      }

      type TokenPayload {
        authToken: String!
        refreshToken: String!
      }

      extend type Mutation {
        registerUserByGoogleIdToken(input: GoogleLoginInput!): TokenPayload

        refreshToken(input: RefreshTokenInput!): TokenPayload
      }
    `,
    resolvers: {
      Mutation: {
        registerUserByGoogleIdToken: async (
          _query,
          { input: { idToken } }: { input: { idToken: string } },
          context: ContextType,
          resolveInfo
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
        refreshToken: async (
          _query,
          { input: { refreshToken } }: { input: { refreshToken: string } },
          { signAuthToken, setAuthCookies, verifyRefreshToken }: ContextType,
          resolveInfo
        ) => {
          const payload = await verifyRefreshToken(refreshToken);

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
