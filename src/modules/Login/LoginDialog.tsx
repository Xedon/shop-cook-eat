import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { useDispatch } from "react-redux";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigation } from "../../state/selectors";
import { appSlice, View } from "../../state/app";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const LoginDialog = () => {
  const { view } = useNavigation();

  return (
    <Dialog
      fullScreen
      open={view === View.Login}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography>Login</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={(theme) => ({ margin: theme.spacing(2) })}>
        <Typography>Please login with google.</Typography>
      </Box>
    </Dialog>
  );
};
