
CREATE ROLE graphql_auth;

CREATE TYPE ORIGIN as enum('GOOGLE','OWN');

CREATE TABLE account(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_origin ORIGIN NOT NULL,
  google_id BIGINT UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_picture_url TEXT
);
GRANT SELECT, INSERT, UPDATE ON TABLE account TO graphql_auth;


CREATE TABLE used_tokens(
    from_date TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP,
    token_hash TEXT NOT NULL,
    token_type ORIGIN NOT NULL,
    PRIMARY KEY (token_hash, token_type)
);
GRANT SELECT,INSERT,UPDATE,DELETE ON TABLE used_tokens TO graphql_auth;
