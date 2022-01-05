import { Context, gql, makeExtendSchemaPlugin } from "postgraphile";
import { OAuth2Client } from "google-auth-library";
import { GraphQLError } from "graphql";
import { ContextType } from "..";
import { addDays } from "date-fns";

export const GoogleLoginPlugin = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
      input GoogleLoginInput {
        idToken: String!
      }

      type RegisterUserPayload {
        refreshToken: String!
        token: String!
      }

      extend type Mutation {
        registerUser(input: GoogleLoginInput!): RegisterUserPayload
      }
    `,
    resolvers: {
      Mutation: {
        registerUser: async (
          _query,
          { input: { idToken } }: { input: { idToken: string } },
          context: ContextType,
          resolveInfo
        ) => {
          GraphQLError;
          const { setAuthCookies, decodeJwt, signJwt } = context;
          const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);

          async function verify() {
            const ticket = await client.verifyIdToken({
              idToken,
              audience: process.env.GOOGLE_CLIENT_KEY,
            });

            const payload = ticket.getPayload()!;

            if (!payload.email_verified) {
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

            const token = signJwt(payload, { expiresIn: "7d" });
            const refreshToken = signJwt(payload, {
              expiresIn: "1d",
            });

            setAuthCookies({
              auth: {
                token: token,
                expires: addDays(new Date(), 7),
              },
              refresh: {
                token: refreshToken,
                expires: addDays(new Date(), 1),
              },
            });

            return {
              token,
              refreshToken,
            };
            /* TODO generate token */
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
