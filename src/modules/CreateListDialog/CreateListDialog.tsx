import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigation } from "../../state/selectors";
import { appSlice, View } from "../../state/app";
import { useCreateShoppingListWithNameMutation } from "./mutation.generated";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateListDialog = () => {
  const { view } = useNavigation();
  const dispatch = useDispatch();

  const [createShoppingListResult, createShoppingList] =
    useCreateShoppingListWithNameMutation();

  const [name, setName] = useState("");

  const onAbort = useCallback(
    () => dispatch(appSlice.actions.navigate({ view: View.Lists })),
    [dispatch]
  );

  const onCreate = useCallback(() => {
    if (name) {
      createShoppingList({ name });
    }
  }, [createShoppingList, name]);

  useEffect(() => {
    if (
      createShoppingListResult.fetching === false &&
      createShoppingListResult.error === undefined &&
      createShoppingListResult.data
    ) {
      setName("");
      onAbort();
    }
  }, [
    createShoppingListResult.data,
    createShoppingListResult.error,
    createShoppingListResult.fetching,
    onAbort,
  ]);

  return (
    <Dialog
      fullScreen
      open={view === View.AddList}
      onClose={onAbort}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onAbort}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography>Shopping List</Typography>

          <Button autoFocus color="inherit" onClick={onCreate}>
            Add
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={(theme) => ({ margin: theme.spacing(2) })}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onCreate();
            }
          }}
          title="Name"
          label="Name"
          variant="standard"
          size="medium"
          color="secondary"
          autoFocus
          required
          fullWidth
          error={
            createShoppingListResult.fetching === false &&
            createShoppingListResult.error !== undefined
          }
          helperText={
            createShoppingListResult.fetching === false &&
            createShoppingListResult.error !== undefined
              ? "List already exists"
              : undefined
          }
        />
      </Box>
    </Dialog>
  );
};
