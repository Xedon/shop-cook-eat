CREATE TABLE user (
  id BIGINT PRIMARY KEY,
  email TEXT NOT NULL,
  profile_picture_url TEXT NOT NULL
);

CREATE TYPE TOKEN_TYPE as enum('GOOGLE','OWN')

CREATE TABLE used_tokens (
    token_hash TEXT NOT NULL,
    token_type TOKEN_TYPE NOT NULL,
    PRIMARY KEY (token_hash, token_type)
)