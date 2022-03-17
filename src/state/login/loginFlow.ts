import { formatISO, fromUnixTime, isPast, parseISO } from "date-fns";
import jwtDecode from "jwt-decode";
import { Client } from "urql";
import { GoogleAuthClient } from "../../tools/GoogleAuthClientWrapper";
import { AppSlice, appSlice, View } from "../app";
import {
  apiLoginFailed,
  apiLoginSuccessful,
  AppDispatch,
  googleLoginFailed,
  googleLoginSuccessful,
  RootState,
} from "../store";
import {
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  RefreshTokenDocument,
  LoginUserByGoogleIdTokenDocument,
  LoginUserByGoogleIdTokenMutation,
  LoginUserByGoogleIdTokenMutationVariables,
} from "./mutation.generated";

export const loginOrRefresh = async (
  googleAuthClient: GoogleAuthClient,
  graphqlClient: Client,
  state: RootState,
  dispatch: AppDispatch
) => {
  // Relogin with Google to veryfi that the account is vallid
  if (isGoogleLoginExpired(state)) {
    await loginWithGoogle(googleAuthClient, graphqlClient, dispatch);
  }

  // Refresh token because session is still ok
  if (isAuthTokenExpired(state)) {
    const result = await graphqlClient
      .mutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
        RefreshTokenDocument
      )
      .toPromise();

    if (result.data?.refreshToken) {
      dispatchApiLoginSuccessful(dispatch, {
        ...result.data.refreshToken,
      });
    } else {
      dispatch(apiLoginFailed());
    }
  }
};

const loginWithGoogle = async (
  googleAuthClient: GoogleAuthClient,
  graphqlClient: Client,
  dispatch: AppDispatch
) => {
  const idToken = await triggerGoogleLogin(googleAuthClient, dispatch);
  console.log(idToken);
  if (!idToken) {
    return;
  }

  const result = await graphqlClient
    .mutation<
      LoginUserByGoogleIdTokenMutation,
      LoginUserByGoogleIdTokenMutationVariables
    >(LoginUserByGoogleIdTokenDocument, { idToken })
    .toPromise();
  if (result.error || !result.data?.loginUserByGoogleIdToken) {
    dispatch(apiLoginFailed());
    return;
  }

  dispatchApiLoginSuccessful(dispatch, {
    ...result.data.loginUserByGoogleIdToken,
  });
};

const isAuthTokenExpired = (state: { app: AppSlice }) => {
  return (
    !state.app.authTokenExpirationDate ||
    isPast(parseISO(state.app.authTokenExpirationDate))
  );
};

const isGoogleLoginExpired = (state: { app: AppSlice }) => {
  return (
    !state.app.refreshTokenExpirationDate ||
    isPast(parseISO(state.app.refreshTokenExpirationDate))
  );
};

const triggerGoogleLogin = (
  googleAuthClient: GoogleAuthClient,
  dispatch: AppDispatch
) => {
  return googleAuthClient
    .promt()
    .then((credentials) => {
      dispatch(googleLoginSuccessful(credentials.token));
      return credentials.token;
    })
    .catch(() => {
      dispatch(googleLoginFailed());
      return undefined;
    });
};

const dispatchApiLoginSuccessful = (
  dispatch: AppDispatch,
  { authToken, refreshToken }: { authToken: string; refreshToken: string }
) => {
  const authTokenExpirationDate = decodeTokenExpirationDate(authToken);
  const refreshTokenExpirationDate = decodeTokenExpirationDate(refreshToken);

  dispatch(appSlice.actions.navigate({ view: View.Lists }));
  dispatch(
    apiLoginSuccessful({
      authTokenExpirationDate,
      refreshTokenExpirationDate,
    })
  );
};

const decodeTokenExpirationDate = (authToken: string): string => {
  const exp = jwtDecode<{ exp: any }>(authToken).exp;

  if (typeof exp !== "number") {
    throw new Error("Token exp is not a number");
  }

  return formatISO(fromUnixTime(exp));
};
