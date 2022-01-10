/* eslint-disable*/
import * as Types from "../../generated/types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TokenPayloadFragment = {
  __typename?: "TokenPayload";
  authToken: string;
  refreshToken: string;
};

export type RegisterUserByGoogleIdTokenMutationVariables = Types.Exact<{
  idToken: Types.Scalars["String"];
}>;

export type RegisterUserByGoogleIdTokenMutation = {
  __typename?: "Mutation";
  registerUserByGoogleIdToken?:
    | { __typename?: "TokenPayload"; authToken: string; refreshToken: string }
    | null
    | undefined;
};

export type RefreshTokenMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars["String"];
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken?:
    | { __typename?: "TokenPayload"; authToken: string; refreshToken: string }
    | null
    | undefined;
};

export const TokenPayloadFragmentDoc = gql`
  fragment TokenPayload on TokenPayload {
    authToken
    refreshToken
  }
`;
export const RegisterUserByGoogleIdTokenDocument = gql`
  mutation registerUserByGoogleIdToken($idToken: String!) {
    registerUserByGoogleIdToken(input: { idToken: $idToken }) {
      ...TokenPayload
    }
  }
  ${TokenPayloadFragmentDoc}
`;

export function useRegisterUserByGoogleIdTokenMutation() {
  return Urql.useMutation<
    RegisterUserByGoogleIdTokenMutation,
    RegisterUserByGoogleIdTokenMutationVariables
  >(RegisterUserByGoogleIdTokenDocument);
}
export const RefreshTokenDocument = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(input: { refreshToken: $refreshToken }) {
      ...TokenPayload
    }
  }
  ${TokenPayloadFragmentDoc}
`;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument
  );
}
