import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum View {
  Lists = "Lists",
  List = "List",
  Cooking = "Cooking",
}

export interface NavigationParmeterCooking {
  view: View.Cooking;
}

export interface NavigationParmeterList {
  view: View.List;
  parameter: { nodeId: string };
}

export interface NavigationParmeterLists {
  view: View.Lists;
}

export interface AppSlice {
  navigation:
    | NavigationParmeterCooking
    | NavigationParmeterList
    | NavigationParmeterLists;
}

const initialState: AppSlice = { navigation: { view: View.Lists } };

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<AppSlice["navigation"]>) => {
      state.navigation = action.payload;
    },
  },
});
