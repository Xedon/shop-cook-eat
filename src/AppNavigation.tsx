import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { CookingPlan } from "./modules/CookingPlan/CookingPlan";
import { ShoppingList } from "./modules/ShoppingList/ShoppingList";
import { ShoppingLists } from "./modules/ShoppingLists/ShoppingLists";
import { AppSlice, View } from "./state/app";
import { RootState } from "./state/store";

const AppContentInternal = (props: AppSlice["navigation"]) => {
  switch (props.view) {
    case View.List:
      return <ShoppingList {...props.parameter} />;
    case View.Lists:
      return <ShoppingLists />;
    case View.Cooking:
      return <CookingPlan />;
  }
};

export const AppContent = () => {
  const { navigation } = useSelector((state: RootState) => state.app);
  const isAppBarBigger = useMediaQuery("(min-width: 600px)");

  const workSpaceCss = {
    overflow: "auto",
    width: "100vw",
    height: `calc(100vh - ${
      navigation.view === View.List ? "81px" : isAppBarBigger ? "64px" : "56px"
    })`,
  };

  return (
    <Box sx={workSpaceCss}>
      <AppContentInternal {...navigation} />
    </Box>
  );
};
