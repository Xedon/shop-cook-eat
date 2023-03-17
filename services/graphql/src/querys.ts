import { PoolClient } from "pg";

interface Account {
  auth0Id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  created_at: string;
  updated_at: string;
}

export const runQueryAsGraphqlAuthRole = async <T = unknown>(
  pgClient: PoolClient,
  query: string,
  variables: Array<string | null | undefined>
) => {
  await pgClient.query("SET ROLE 'graphql_auth'");
  return pgClient.query<T>(query, variables).finally(async () => {
    await pgClient.query("RESET ROLE");
  });
};

export const selectAuth0AccountEntry = async (
  pgClient: PoolClient,
  { auth0Id }: Pick<Account, "auth0Id">
) => {
  return await runQueryAsGraphqlAuthRole<Account>(
    pgClient,
    "SELECT  auth0_id, name, email, profile_picture_url FROM account WHERE auth0_id=$1 AND  account_origin='AUTH0'",
    [auth0Id]
  ).then<Account | undefined>((result) => result.rows[0]);
};

export const updateAuth0AccoutEntry = async (
  pgClient: PoolClient,
  {
    auth0Id,
    name,
    email,
    profilePictureUrl,
  }: Pick<Account, "auth0Id" | "email" | "name" | "profilePictureUrl">
) => {
  return runQueryAsGraphqlAuthRole(
    pgClient,
    "UPDATE account SET (updated_at=CURRENT_TIMESTAMP() ,name=$3, email=$4, profile_picture_url=$5) WHERE account_origin=$1 AND auth0_id=$2)",
    ["AUTH0", auth0Id, name, email, profilePictureUrl]
  );
};

export const insertAuth0AccoutEntry = async (
  pgClient: PoolClient,
  {
    auth0Id,
    name,
    email,
    profilePictureUrl,
  }: Pick<Account, "auth0Id" | "email" | "name" | "profilePictureUrl">
) => {
  return runQueryAsGraphqlAuthRole(
    pgClient,
    "INSERT INTO account(account_origin, auth0_id, name, email, profile_picture_url) VALUES ($1,$2,$3,$4,$5)",
    ["AUTH0", auth0Id, name, email, profilePictureUrl]
  );
};
