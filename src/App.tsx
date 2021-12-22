import { AppBar, Button, Fade, Grid, Toolbar } from "@mui/material";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { useDispatch, useSelector } from "react-redux";
import { appSlice, View } from "./state/app";
import { AppNavigation } from "./AppNavigation";
import { InputField } from "./components/InputField";
import { RootState } from "./state/store";

function App() {
  const dispatch = useDispatch();
  const { view } = useSelector((state: RootState) => state.app.navigation);
  return (
    <>
      <AppNavigation />
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Grid direction="column" container>
            <Grid item>
              <Fade unmountOnExit in={view === View.List}>
                <InputField />
              </Fade>
            </Grid>
            <Grid item>
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
                disabled
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
