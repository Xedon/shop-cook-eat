import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from "@mui/material";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { useDispatch } from "react-redux";
import { appSlice, View } from "../../state/app";
import { ListMenuAddition } from "./ListMenuAddition";
import { useNavigation } from "../../state/selectors";

export const AppMenu = () => {
  const dispatch = useDispatch();
  const { view } = useNavigation();
  return (
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
          <ListMenuAddition />
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
  );
};
