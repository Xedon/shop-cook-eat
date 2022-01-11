import { AnyAction, Store } from "@reduxjs/toolkit";
import { RootState } from "./store";

const KEY = "STATE";

const saveStateToLocalStorage = (state: RootState) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

export const loadStateFromLocalStorage = (): any | undefined => {
  const storeJson = localStorage.getItem(KEY);
  if (storeJson) {
    return JSON.parse(storeJson);
  }
  return undefined;
};

export const registerStateToLocalStorageSubscriber = (
  store: Store<RootState, AnyAction>
) => {
  store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
  });
};
