import { PoolClient } from "pg";

export const runQueryAsGraphqlAuthRole = async (
  pgClient: PoolClient,
  query: string,
  variables: Array<string | null>
) => {
  await pgClient.query("SET ROLE 'graphql_auth'");
  return pgClient.query(query, variables).finally(async () => {
    await pgClient.query("RESET ROLE");
  });
};

export const selectIsGoogleTokenUsed = async (
  pgClient: PoolClient,
  { idToken }: { idToken: string }
) => {
  return (
    (
      await runQueryAsGraphqlAuthRole(
        pgClient,
        "SELECT token_hash FROM used_tokens WHERE token_hash=ENCODE(SHA512($1),'hex') AND token_type = 'GOOGLE'",
        [idToken]
      )
    ).rowCount === 1
  );
};

export const insertTokenEntry = async (
  pgClient: PoolClient,
  { idToken }: { idToken: string }
) => {
  return runQueryAsGraphqlAuthRole(
    pgClient,
    "INSERT INTO used_tokens (token_hash,token_type) VALUES (ENCODE(SHA512($1),'hex'),'GOOGLE')",
    [idToken]
  );
};

export const insertGoogleAccoutEntry = async (
  pgClient: PoolClient,
  {
    googleId,
    name,
    email,
    profilePictureUrl,
  }: {
    googleId: string;
    name: string;
    email: string;
    profilePictureUrl: string | null;
  }
) => {
  return runQueryAsGraphqlAuthRole(
    pgClient,
    "INSERT INTO account(account_origin, google_id, name, email, profile_picture_url) VALUES ($1,$2,$3,$4,$5)",
    ["GOOGLE", googleId, name, email, profilePictureUrl]
  );
};

export const selectGoogleAccoutEntryExists = async (
  pgClient: PoolClient,
  {
    googleId,
  }: {
    googleId: string;
  }
): Promise<boolean> => {
  return runQueryAsGraphqlAuthRole(
    pgClient,
    "SELECT 1 FROM account WHERE account_origin=$1 and google_id=$2",
    ["GOOGLE", googleId]
  ).then((v) => v.rowCount === 1);
};
