import { AnyAction, Dispatch, Middleware } from "@reduxjs/toolkit";
import { createAuthChannel, postAuthResponse } from "../tools/Communication";
import { AppSlice } from "./app";
import { initAction, loginAction, loginFailed, loginSuccessful } from "./store";
import { Client as GraphqlClient } from "urql";

const serviceWorkerChannel = createAuthChannel();

export const LoginMiddleware: (
  graphqlClient: GraphqlClient
) => Middleware<{}, { app: AppSlice }, Dispatch<AnyAction>> =
  (graphqlClient) => (store) => (next) => (action) => {
    next(action);
    if (initAction.match(action)) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: (resp: any) =>
          store.dispatch(loginSuccessful(resp.credential)),
        auto_select: true,
      });
      store.dispatch(loginAction());
    }

    if (loginAction.match(action)) {
      (window as any).google.accounts.id.prompt((promt: any) => {
        if (promt.isSkippedMoment() || promt.isNotDisplayed()) {
          store.dispatch(loginFailed());
        }
      });
    }

    if (loginSuccessful.match(action)) {
      postAuthResponse(serviceWorkerChannel, action.payload);
    }
  };
