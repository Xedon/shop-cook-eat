import { Paper, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { CookingPlan } from "./modules/CookingPlan/CookingPlan";
import { ShoppingList } from "./modules/ShoppingList/ShoppingList";
import { ShoppingLists } from "./modules/ShoppingLists/ShoppingLists";
import { Navigation } from "./state/app";
import { RootState } from "./state/store";

const AppContent = ({ navigation }: { navigation: Navigation }) => {
  switch (navigation) {
    case Navigation.List:
      return <ShoppingList />;
    case Navigation.Lists:
      return <ShoppingLists />;
    case Navigation.Cooking:
      return <CookingPlan />;
  }
};

export const AppNavigation = () => {
  const { navigation } = useSelector((state: RootState) => state.app);
  const isAppBarBigger = useMediaQuery("(min-width: 600px)");
  return (
    <Paper
      sx={{
        width: "100vw",
        minHeight: `calc(100vh - ${isAppBarBigger ? "64px" : "48px"})`,
      }}
    >
      <AppContent navigation={navigation} />
    </Paper>
  );
};
