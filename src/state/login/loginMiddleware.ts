import { AnyAction, Dispatch, Middleware } from "@reduxjs/toolkit";
import { createAuthChannel, postAuthResponse } from "../../tools/Communication";
import { appSlice, AppSlice, View } from "../app";
import {
  initAction,
  loginAction,
  googleLoginFailed,
  googleLoginSuccessful,
  apiLoginSuccessful,
  apiLoginFailed,
} from "../store";
import { Client as GraphqlClient } from "urql";
import {
  RefreshTokenDocument,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  RegisterUserByGoogleIdTokenDocument,
  RegisterUserByGoogleIdTokenMutation,
  RegisterUserByGoogleIdTokenMutationVariables,
} from "./mutation.generated";

const serviceWorkerChannel = createAuthChannel();

export const loginMiddlewareFactory: (
  graphqlClient: GraphqlClient
) => Middleware<{}, { app: AppSlice }, Dispatch<AnyAction>> =
  (graphqlClient) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (initAction.match(action)) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: (resp: any) =>
          dispatch(googleLoginSuccessful(resp.credential)),
        auto_select: true,
      });
      dispatch(loginAction());
    }

    if (loginAction.match(action)) {
      const state = getState();
      if (state.app.authToken && state.app.refreshToken) {
        const result = await graphqlClient
          .mutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
            RefreshTokenDocument,
            { refreshToken: state.app.refreshToken }
          )
          .toPromise();
        if (result.data?.refreshToken) {
          dispatch(apiLoginSuccessful(result.data.refreshToken));
          return;
        }
        dispatch(apiLoginFailed());
      }
      (window as any).google.accounts.id.prompt((promt: any) => {
        if (promt.isSkippedMoment() || promt.isNotDisplayed()) {
          dispatch(googleLoginFailed());
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
        dispatch(googleLoginFailed());
        return;
      }

      dispatch(appSlice.actions.navigate({ view: View.Lists }));
      dispatch(
        apiLoginSuccessful({
          authToken: result.data.registerUserByGoogleIdToken.authToken,
          refreshToken: result.data.registerUserByGoogleIdToken.refreshToken,
        })
      );
    }
  };
