import { configureStore, createAction } from "@reduxjs/toolkit";
import { Client as GraphqlClient } from "urql";
import { appSlice } from "./app";
import { LoginMiddleware } from "./loginMiddleware";

export const initAction = createAction("init");
export const loginAction = createAction("login");
export const loginSuccessful = createAction<string>("login-successful");
export const loginFailed = createAction("login-failed");

export const createStore = (graphqlClient: GraphqlClient) => {
  const store = configureStore({
    middleware: (defaultMiddlewares) => [
      ...defaultMiddlewares(),
      LoginMiddleware(graphqlClient),
    ],
    reducer: { [appSlice.name]: appSlice.reducer },
  });
  store.dispatch(initAction());
  return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
