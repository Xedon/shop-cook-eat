import { Box, Fade } from "@mui/material";
import { View } from "../../state/app";
import { InputField } from "../../components/InputField";
import {
  useSearchForItemsQuery,
  useSelectCustomCategoryQuery,
} from "./query.generated";
import { useCallback, useMemo, useState } from "react";
import { CardRenderer } from "../../components/CardRenderer";
import {
  useAddItemToShoppingListByNodeIdMutation,
  useCreateItemAndAddToShoppingListMutation,
} from "./mutation.generated";
import { useNavigation } from "../../state/selectors";

export const ListMenuAddition = () => {
  const navigation = useNavigation();

  const [searchString, setSearchString] = useState<string>("");

  const [customCategory] = useSelectCustomCategoryQuery();

  const [foundItems] = useSearchForItemsQuery({
    pause: searchString === "",
    variables: { includesInsensitive: searchString },
  });

  const [, addItemToShoppingList] = useAddItemToShoppingListByNodeIdMutation();
  const [, createItemAndAddToShoppingList] =
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
          categoryId: customCategory.data?.itemCategories?.nodes[0]?.id,
          itemName: name,
          shoppingListNodeId,
        });
      }
      setSearchString("");
    },
    [
      addItemToShoppingList,
      createItemAndAddToShoppingList,
      customCategory.data?.itemCategories?.nodes,
      navigation,
    ]
  );

  const displayedCards = useMemo(() => {
    if (navigation.view !== View.List) {
      return [];
    }

    const foundCards = (foundItems.data?.items?.nodes ?? []).filter(
      (item) =>
        !item?.itemShoppingLists.nodes.some(
          (shoppingLists) =>
            shoppingLists?.shoppingList?.nodeId === navigation.parameter.nodeId
        )
    );

    return [
      ...(searchString !== ""
        ? [{ id: 0, nodeId: "", name: searchString }]
        : []),
      ...foundCards,
    ];
  }, [foundItems.data?.items?.nodes, navigation, searchString]);

  return (
    <Fade unmountOnExit in={navigation.view === View.List}>
      <Box>
        <InputField
          value={searchString}
          placeholder="What did you want to Buy?"
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
