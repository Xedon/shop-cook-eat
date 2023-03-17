import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiLoginSuccessful } from "./store";

export enum View {
  Lists = "Lists",
  List = "List",
  Cooking = "Cooking",
  AddList = "AddList",
  Login = "Login",
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

export interface NavigationParmeterLogin {
  view: View.Login;
}

export interface AppSlice {
  authTokenExpirationDate?: string;
  refreshTokenExpirationDate?: string;
  navigation:
    | NavigationParmeterCooking
    | NavigationParmeterList
    | NavigationParmeterLists
    | NavigationParmeterAddList
    | NavigationParmeterLogin;
}

const initialState: AppSlice = { navigation: { view: View.Login } };

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<AppSlice["navigation"]>) => {
      state.navigation = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(apiLoginSuccessful, (state, action) => {
      state.authTokenExpirationDate = action.payload.authTokenExpirationDate;
      state.refreshTokenExpirationDate =
        action.payload.refreshTokenExpirationDate;
    }),
});
