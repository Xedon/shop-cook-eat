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
import GoogleButton from "../../components/GoogleLogin";

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
  const dispatch = useDispatch();

  return (
    <Dialog
      fullScreen
      open={view === View.AddList}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography>Login</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={(theme) => ({ margin: theme.spacing(2) })}>
        <GoogleButton
          onCredentialResponse={(x) => {
            console.log(x);
            dispatch(appSlice.actions.navigate({ view: View.Lists }));
          }}
        />
      </Box>
    </Dialog>
  );
};
