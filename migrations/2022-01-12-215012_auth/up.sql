
CREATE ROLE graphql_auth;

CREATE TYPE ORIGIN as enum('AUTH0','OWN');

CREATE TABLE account(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_origin ORIGIN NOT NULL,
  auth0_id TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_picture_url TEXT
);
GRANT SELECT, INSERT, UPDATE ON TABLE account TO graphql_auth;
