import { Paper, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { CookingPlan } from "./modules/CookingPlan/CookingPlan";
import { ShoppingList } from "./modules/ShoppingList/ShoppingList";
import { ShoppingLists } from "./modules/ShoppingLists/ShoppingLists";
import { AppSlice, View } from "./state/app";
import { RootState } from "./state/store";

const AppContent = (props: AppSlice["navigation"]) => {
  switch (props.view) {
    case View.List:
      return <ShoppingList {...props.parameter} />;
    case View.Lists:
      return <ShoppingLists />;
    case View.Cooking:
      return <CookingPlan />;
  }
};

export const AppNavigation = () => {
  const { navigation } = useSelector((state: RootState) => state.app);
  const isAppBarBigger = useMediaQuery("(min-width: 600px)");
  return (
    <Paper
      sx={{
        overflow: "scroll",
        width: "100vw",
        maxHeight: `calc(100vh - ${isAppBarBigger ? "64px" : "48px"})`,
      }}
    >
      <AppContent {...navigation} />
    </Paper>
  );
};
