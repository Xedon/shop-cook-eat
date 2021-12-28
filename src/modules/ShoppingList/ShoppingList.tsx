import { Grid, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { appSlice, View } from "../../state/app";
import { useDispatch } from "react-redux";
import { useItemsQuery, useShoppingListByNodeIdQuery } from "./query.generated";
import { CardRenderer } from "../../components/CardRenderer";
import {
  useAddItemToShoppingListMutation,
  useDelteItemFromShoppingListMutation,
} from "./mutation.generated";
import { useMemo } from "react";
import { ItemsByCategoryAccordion } from "./ItemsByCategoryAccordion";

export const ShoppingList = ({ nodeId }: { nodeId: string }) => {
  const disptach = useDispatch();
  const [shoppingList] = useShoppingListByNodeIdQuery({
    variables: { nodeId },
  });

  const [itemQuery] = useItemsQuery();

  const customItems = useMemo(
    () =>
      (itemQuery.data?.items?.nodes ?? []).filter(
        (item) =>
          !shoppingList.data?.shoppingListByNodeId?.itemShoppingLists.nodes.some(
            (shoppingListItem) =>
              shoppingListItem?.item?.nodeId === item?.nodeId
          )
      ),
    [
      itemQuery.data?.items?.nodes,
      shoppingList.data?.shoppingListByNodeId?.itemShoppingLists.nodes,
    ]
  );

  const lastUsedItems = useMemo(
    () =>
      (
        shoppingList.data?.shoppingListByNodeId
          ?.itemsByItemShoppingListHistoryShoppingListIdAndItemId.nodes ?? []
      ).filter(
        (item) =>
          !shoppingList.data?.shoppingListByNodeId?.itemShoppingLists.nodes.some(
            (shoppingListItem) =>
              shoppingListItem?.item?.nodeId === item?.nodeId
          )
      ),
    [
      shoppingList.data?.shoppingListByNodeId?.itemShoppingLists.nodes,
      shoppingList.data?.shoppingListByNodeId
        ?.itemsByItemShoppingListHistoryShoppingListIdAndItemId.nodes,
    ]
  );

  const [, deleteItemFromShoppingList] = useDelteItemFromShoppingListMutation();

  const [, addItemToShoppingList] = useAddItemToShoppingListMutation();
  const t = { blarg: () => console.log() } as any;
  return (
    <Grid container flexDirection="column" spacing={1} sx={{ padding: "4px" }}>
      <Grid item>
        <Button
          color="secondary"
          startIcon={<ArrowBackIcon />}
          title="back"
          onClick={() =>
            disptach(appSlice.actions.navigate({ view: View.Lists }))
          }
        >
          Back
        </Button>

        <Grid item>
          <Typography variant="h5" component="div" align="center">
            {shoppingList.data?.shoppingListByNodeId?.name}
          </Typography>
        </Grid>
        <div {...t}></div>
      </Grid>
      <Grid item>
        <CardRenderer
          cards={
            shoppingList.data?.shoppingListByNodeId?.itemShoppingLists.nodes ??
            []
          }
          onCardClick={(cardData) =>
            deleteItemFromShoppingList({ nodeId: cardData.nodeId })
          }
        />
      </Grid>
      <Grid container item direction="row">
        <Grid item xs={12}>
          <ItemsByCategoryAccordion
            items={lastUsedItems}
            title="Last Used"
            onCardClick={(cardData) =>
              addItemToShoppingList({
                itemId: cardData.id,
                shoppingListId: shoppingList.data?.shoppingListByNodeId?.id,
              })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <ItemsByCategoryAccordion
            items={customItems}
            title="Custom"
            onCardClick={(cardData) =>
              addItemToShoppingList({
                itemId: cardData.id,
                shoppingListId: shoppingList.data?.shoppingListByNodeId?.id,
              })
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
