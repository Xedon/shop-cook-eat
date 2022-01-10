import { AnyAction, Dispatch, Middleware } from "@reduxjs/toolkit";
import { createAuthChannel, postAuthResponse } from "../../tools/Communication";
import { appSlice, AppSlice, View } from "../app";
import {
  initAction,
  loginAction,
  googleLoginFailed,
  googleLoginSuccessful,
  apiLoginSuccessful,
} from "../store";
import { Client as GraphqlClient } from "urql";
import {
  RegisterUserByGoogleIdTokenDocument,
  RegisterUserByGoogleIdTokenMutation,
  RegisterUserByGoogleIdTokenMutationVariables,
} from "./mutation.generated";

const serviceWorkerChannel = createAuthChannel();

export const LoginMiddleware: (
  graphqlClient: GraphqlClient
) => Middleware<{}, { app: AppSlice }, Dispatch<AnyAction>> =
  (graphqlClient) => (store) => (next) => async (action) => {
    next(action);
    if (initAction.match(action)) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: (resp: any) =>
          store.dispatch(googleLoginSuccessful(resp.credential)),
        auto_select: true,
      });
      store.dispatch(loginAction());
    }

    if (loginAction.match(action)) {
      (window as any).google.accounts.id.prompt((promt: any) => {
        if (promt.isSkippedMoment() || promt.isNotDisplayed()) {
          store.dispatch(googleLoginFailed());
        }
      });
    }

    if (googleLoginSuccessful.match(action)) {
      postAuthResponse(serviceWorkerChannel, action.payload);
      const result = await graphqlClient
        .mutation<
          RegisterUserByGoogleIdTokenMutation,
          RegisterUserByGoogleIdTokenMutationVariables
        >(RegisterUserByGoogleIdTokenDocument, { idToken: action.payload })
        .toPromise();
      if (result.error || !result.data?.registerUserByGoogleIdToken) {
        store.dispatch(googleLoginFailed());
        return;
      }

      store.dispatch(appSlice.actions.navigate({ view: View.Lists }));
      store.dispatch(
        apiLoginSuccessful({
          authToken: result.data.registerUserByGoogleIdToken.authToken,
          refreshToken: result.data.registerUserByGoogleIdToken.authToken,
        })
      );
    }
  };
