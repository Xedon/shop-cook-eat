import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  SxProps,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { appSlice, View } from "../../state/app";
import { useShoppingListsQuery } from "./query.generated";
import AddIcon from "@mui/icons-material/Add";
import { useOnlineStatus } from "../../tools/useOnlineStatus";

const cardCss: SxProps = {
  width: "95vw",
};

export const ShoppingLists = () => {
  const dispatch = useDispatch();
  const [shoppingLists] = useShoppingListsQuery();
  const online = useOnlineStatus();

  return (
    <Grid
      container
      alignItems="center"
      rowGap="4px"
      flexDirection="column"
      sx={{ paddingTop: "4px" }}
    >
      {shoppingLists.data?.shoppingLists?.nodes?.map((value) => (
        <Grid key={value?.nodeId} item>
          <Card
            sx={cardCss}
            onClick={() =>
              dispatch(
                appSlice.actions.navigate({
                  view: View.List,
                  parameter: { nodeId: value!.nodeId },
                })
              )
            }
          >
            <CardHeader title={value?.name} />
          </Card>
        </Grid>
      ))}
      <Grid item>
        <Tooltip title={!online ? "Go Online to create a new list" : ""}>
          <Box>
            <Button
              variant="text"
              startIcon={<AddIcon />}
              color="secondary"
              size="large"
              onClick={() =>
                dispatch(appSlice.actions.navigate({ view: View.AddList }))
              }
              disabled={!online}
            >
              Add Shopping List
            </Button>
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
