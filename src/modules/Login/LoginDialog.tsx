import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigation } from "../../state/selectors";
import { View } from "../../state/app";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import { useGoogleLogin } from "../../tools/useGoogleLogin";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const LoginDialog = () => {
  return null;
  const { view } = useNavigation();
  const { login } = useGoogleLogin();

  return (
    <Dialog
      fullScreen
      open={view === View.Login}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography>Login/Registration</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={(theme) => ({ margin: theme.spacing(2), height: "100%" })}>
        <Grid sx={{ height: "100%" }} container justifyContent="center">
          <Grid item>
            <Button
              color="secondary"
              title="Login with Google Account"
              onClick={login}
            >
              Login with Google Account
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
