import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum View {
  Lists = "Lists",
  List = "List",
  Cooking = "Cooking",
  AddList = "AddList",
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

export interface NavigationParmeterAddList {
  view: View.AddList;
}

export interface AppSlice {
  navigation:
    | NavigationParmeterCooking
    | NavigationParmeterList
    | NavigationParmeterLists
    | NavigationParmeterAddList;
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
