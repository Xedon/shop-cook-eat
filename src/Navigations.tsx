import { useSelector } from "react-redux";
import { CookingPlan } from "./modules/CookingPlan/CookingPlan";
import { ShoppingList } from "./modules/ShoppingList/ShoppingList";
import { ShoppingLists } from "./modules/ShoppingLists/ShoppingLists";
import { Navigation } from "./state/app";
import { RootState } from "./state/store";

export const AppNavigation = () => {
  const { navigation } = useSelector((state: RootState) => state.app);
  switch (navigation) {
    case Navigation.List:
      return <ShoppingList />;
    case Navigation.Lists:
      return <ShoppingLists />;
    case Navigation.Cooking:
      return <CookingPlan />;
  }
};
