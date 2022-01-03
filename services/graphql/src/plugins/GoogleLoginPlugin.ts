import { gql, makeExtendSchemaPlugin } from "postgraphile";
import { OAuth2Client } from "google-auth-library";

export const GoogleLoginPlugin = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
      input GoogleLoginInput {
        idToken: String!
      }

      type RegisterUserPayload {
        successful: Boolean!
        refreshToken: String
        Token: String
        query: Query
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
          context,
          resolveInfo
        ) => {
          const { pgClient } = context;
          const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);
          async function verify() {
            const ticket = await client.verifyIdToken({
              idToken,
              audience: process.env.GOOGLE_CLIENT_KEY,
            });
            const payload = ticket.getPayload()!;
            const userid = payload.sub;
          }
          verify()
            .then(() => {
              return {
                successful: true,
              };
            })
            .catch(() => ({ successful: false }));
        },
      },
    },
  };
});
