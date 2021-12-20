import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app";

export const store = configureStore({
  reducer: { [appSlice.name]: appSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
