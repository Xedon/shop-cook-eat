import { AppBar, Button, Toolbar } from "@mui/material";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { useDispatch } from "react-redux";
import { appSlice, View } from "./state/app";
import { AppNavigation } from "./AppNavigation";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <AppNavigation />
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Button
            variant="text"
            color="inherit"
            size="large"
            startIcon={<LocalGroceryStoreOutlinedIcon />}
            key="lists"
            onClick={() =>
              dispatch(appSlice.actions.navigate({ view: View.Lists }))
            }
          >
            Lists
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="large"
            startIcon={<RestaurantOutlinedIcon />}
            key="cooking"
            onClick={() =>
              dispatch(appSlice.actions.navigate({ view: View.Cooking }))
            }
          >
            Cooking
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
