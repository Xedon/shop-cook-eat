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

export type LoginUserByGoogleIdTokenMutationVariables = Types.Exact<{
  idToken: Types.Scalars["String"];
}>;

export type LoginUserByGoogleIdTokenMutation = {
  __typename?: "Mutation";
  loginUserByGoogleIdToken?:
    | { __typename?: "TokenPayload"; authToken: string; refreshToken: string }
    | null
    | undefined;
};

export type RefreshTokenMutationVariables = Types.Exact<{
  [key: string]: never;
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
export const LoginUserByGoogleIdTokenDocument = gql`
  mutation loginUserByGoogleIdToken($idToken: String!) {
    loginUserByGoogleIdToken(input: { idToken: $idToken }) {
      ...TokenPayload
    }
  }
  ${TokenPayloadFragmentDoc}
`;

export function useLoginUserByGoogleIdTokenMutation() {
  return Urql.useMutation<
    LoginUserByGoogleIdTokenMutation,
    LoginUserByGoogleIdTokenMutationVariables
  >(LoginUserByGoogleIdTokenDocument);
}
export const RefreshTokenDocument = gql`
  mutation refreshToken {
    refreshToken {
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
