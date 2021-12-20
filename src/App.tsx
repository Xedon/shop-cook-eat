import { AppBar, Button, Toolbar } from "@mui/material";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { useDispatch } from "react-redux";
import { appSlice, Navigation } from "./state/app";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Button
            variant="text"
            color="inherit"
            size="large"
            startIcon={<LocalGroceryStoreOutlinedIcon />}
            key="lists"
            onClick={() =>
              dispatch(appSlice.actions.navigate(Navigation.Lists))
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
              dispatch(appSlice.actions.navigate(Navigation.Cooking))
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
