import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Fade,
  Grid,
  Paper,
  Toolbar,
} from "@mui/material";
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
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
          backgroundImage: "none",
        }}
        elevation={3}
      >
        <Grid direction="column" container>
          <Grid
            item
            sx={(theme) => ({
              paddingLeft: theme.spacing(1),
              paddingRight: theme.spacing(1),
            })}
          >
            <Fade unmountOnExit in={view === View.List}>
              <InputField />
            </Fade>
          </Grid>
          <Grid item>
            <BottomNavigation
              showLabels
              value={view}
              onChange={(event, view) => {
                dispatch(appSlice.actions.navigate({ view }));
              }}
            >
              <BottomNavigationAction
                label="Lists"
                value={View.Lists}
                icon={<LocalGroceryStoreOutlinedIcon />}
              />
              <BottomNavigationAction
                label="Cooking"
                value={View.Cooking}
                icon={<RestaurantOutlinedIcon />}
              />
            </BottomNavigation>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default App;
