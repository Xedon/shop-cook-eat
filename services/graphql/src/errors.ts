import { GraphQLError } from "graphql";

export enum AuthErrors {
  TOKEN_INVALLID = "TOKEN_INVALLID",
  USER_NOT_VERIFIED = "USER_NOT_VERIFIED",
  INFORMATIONS_NOT_SUFFICIENT = "INFORMATIONS_NOT_SUFFICIENT",
}

const authErrorsMap: Record<AuthErrors, string> = {
  TOKEN_INVALLID: "Token is Invallid",
  USER_NOT_VERIFIED: "Google user is not verified",
  INFORMATIONS_NOT_SUFFICIENT: "Informations not sufficient for registration",
};

export const buildError = (error: AuthErrors) =>
  new GraphQLError(
    authErrorsMap[error],
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { authPlugin: error }
  );
