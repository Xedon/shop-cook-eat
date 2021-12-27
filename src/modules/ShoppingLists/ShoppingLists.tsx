import { Button, Card, CardHeader, Grid, SxProps } from "@mui/material";
import { useDispatch } from "react-redux";
import { appSlice, View } from "../../state/app";
import { useShoppingListsQuery } from "./query.generated";
import AddIcon from "@mui/icons-material/Add";

const cardCss: SxProps = {
  width: "95vw",
};

export const ShoppingLists = () => {
  const dispatch = useDispatch();
  const [shoppingLists] = useShoppingListsQuery();
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
        <Button
          variant="text"
          startIcon={<AddIcon />}
          title="Add Shopping List"
          color="secondary"
          size="large"
          onClick={() =>
            dispatch(appSlice.actions.navigate({ view: View.AddList }))
          }
        >
          Add Shopping List
        </Button>
      </Grid>
    </Grid>
  );
};
