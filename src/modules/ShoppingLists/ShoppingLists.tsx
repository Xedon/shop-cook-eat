import { Card, CardHeader, Grid, SxProps } from "@mui/material";
import { useDispatch } from "react-redux";
import { appSlice, View } from "../../state/app";
import { useShoppingListsQuery } from "./query.generated";

const cardCss: SxProps = {
  width: "95vw",
};

const cards = Array(10).fill({ name: "Text" });

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
    </Grid>
  );
};
