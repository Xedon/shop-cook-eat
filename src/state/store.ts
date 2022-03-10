import { configureStore, createAction } from "@reduxjs/toolkit";
import { Client as GraphqlClient } from "urql";
import { GoogleAuthClient } from "../tools/GoogleAuthClientWrapper";
import { appSlice } from "./app";
import { loginMiddlewareFactory } from "./login/loginMiddleware";
import {
  loadStateFromLocalStorage,
  registerStateToLocalStorageSubscriber,
} from "./statePersistence";

export const initAction = createAction("init");
export const loginAction = createAction("login");

export const googleLoginSuccessful = createAction<string>(
  "google-login-successful"
);
export const googleLoginFailed = createAction("google-login-failed");

export const apiLoginSuccessful = createAction<{
  authTokenExpirationDate?: string;
  refreshTokenExpirationDate: string;
}>("api-login-successful");

export const apiLoginFailed = createAction("api-login-failed");

export const createStore = (
  graphqlClient: GraphqlClient,
  googleAuthClient: GoogleAuthClient
) => {
  const store = configureStore({
    preloadedState: loadStateFromLocalStorage(),
    middleware: (defaultMiddlewares) => [
      ...defaultMiddlewares(),
      loginMiddlewareFactory(graphqlClient, googleAuthClient),
    ],
    reducer: { [appSlice.name]: appSlice.reducer },
  });
  registerStateToLocalStorageSubscriber(store);
  store.dispatch(initAction());
  return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
