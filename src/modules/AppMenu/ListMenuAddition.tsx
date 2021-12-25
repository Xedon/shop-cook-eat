import { Box, Fade } from "@mui/material";
import { useSelector } from "react-redux";
import { View } from "../../state/app";
import { InputField } from "../../components/InputField";
import { RootState } from "../../state/store";
import { useSearchForItemsQuery } from "./query.generated";
import { useCallback, useState } from "react";
import { CardRenderer } from "../../components/CardRenderer";
import {
  useAddItemToShoppingListByNodeIdMutation,
  useCreateItemAndAddToShoppingListMutation,
} from "./mutation.generated";

export const ListMenuAddition = () => {
  const navigation = useSelector((state: RootState) => state.app.navigation);
  const [searchString, setSearchString] = useState<string>("");
  const [foundItems] = useSearchForItemsQuery({
    pause: searchString === "",
    variables: { includesInsensitive: searchString },
  });

  const [addItemToShoppingListResult, addItemToShoppingList] =
    useAddItemToShoppingListByNodeIdMutation();
  const [createItemAndAddToShoppingListResult, createItemAndAddToShoppingList] =
    useCreateItemAndAddToShoppingListMutation();

  const onCardClick = useCallback(
    ({ id, name }: { id?: number; name: string }) => {
      if (navigation.view !== View.List) {
        return;
      }
      const shoppingListNodeId = navigation.parameter.nodeId;

      if (id) {
        addItemToShoppingList({
          itemId: id,
          shoppingListNodeId,
        });
      } else {
        createItemAndAddToShoppingList({
          categoryId: 1,
          itemName: name,
          shoppingListNodeId,
        });
      }
      setSearchString("");
    },
    [addItemToShoppingList, createItemAndAddToShoppingList, navigation]
  );

  const foundCards = foundItems.data?.items?.nodes ?? [];
  const displayedCards = [
    ...(searchString !== "" ? [{ id: 0, nodeId: "", name: searchString }] : []),
    ...foundCards,
  ];

  return (
    <Fade unmountOnExit in={navigation.view === View.List}>
      <Box>
        <InputField
          value={searchString}
          onChange={(event) => setSearchString(event.target.value.trim())}
        />
        <CardRenderer
          sx={(theme) => ({
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(1),
          })}
          cards={displayedCards}
          onCardClick={onCardClick}
        />
      </Box>
    </Fade>
  );
};
