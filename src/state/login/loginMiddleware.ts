import { AnyAction, Dispatch, Middleware } from "@reduxjs/toolkit";
import { Client as GraphqlClient } from "urql";
import { createAuthChannel } from "../../tools/Communication";
import { GoogleAuthClient } from "../../tools/GoogleAuthClientWrapper";
import { appSlice, AppSlice, View } from "../app";
import {
  apiLoginFailed,
  apiLoginSuccessful,
  googleLoginFailed,
  initAction,
  loginAction,
} from "../store";
import { loginOrRefresh } from "./loginFlow";

const serviceWorkerChannel = createAuthChannel();

export const loginMiddlewareFactory: (
  graphqlClient: GraphqlClient,
  googleAuthClient: GoogleAuthClient
) => Middleware<{}, { app: AppSlice }, Dispatch<AnyAction>> =
  (graphqlClient, googleAuthClient) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    console.log(action);
    next(action);
    if (initAction.match(action) || loginAction.match(action)) {
      loginOrRefresh(googleAuthClient, graphqlClient, getState(), dispatch);
    }

    if (apiLoginSuccessful.match(action)) {
      dispatch(appSlice.actions.navigate({ view: View.Lists }));
    }

    if (googleLoginFailed.match(action) || apiLoginFailed.match(action)) {
      dispatch(appSlice.actions.navigate({ view: View.Login }));
    }
  };
