import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Navigation {
  Lists = "Lists",
  List = "List",
  Cooking = "Cooking",
}

export interface AppSlice {
  navigation: Navigation;
}

const initialState: AppSlice = { navigation: Navigation.Lists };

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<Navigation>) => {},
  },
});
