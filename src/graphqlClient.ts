import { createClient, dedupExchange, fetchExchange } from "urql";
import { Cache, offlineExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import introspection from "./generated/introspection.json";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";
import {
  MutationCreateItemShoppingListArgs,
  MutationDeleteItemByNodeIdArgs,
} from "./types";
import {
  ItemsDocument,
  ItemsQuery,
  ShoppingListByNodeIdDocument,
  ShoppingListByNodeIdQuery,
} from "./modules/ShoppingList/query.generated";
import { encodeNodeId, decodeNodeId } from "./tools/nodeId";
import {
  ItemFragmentDoc,
  ItemFragment,
  ItemShoppingListFragmentDoc,
  ItemShoppingListFragment,
  CreateItemShoppingListFragment,
} from "./graphql/fragments.generated";

const storage = makeDefaultStorage({
  idbName: "graphcache-v3",
  maxAge: 1,
});

const cache = offlineExchange({
  schema: introspection as any,
  storage,
  updates: {
    Mutation: {
      createItemShoppingList: (
        {
          createItemShoppingList: { itemShoppingList },
        }: { createItemShoppingList: CreateItemShoppingListFragment },
        args,
        cache
      ) => {
        if (itemShoppingList === undefined || itemShoppingList === null) {
          throw new Error(
            "Mutation createItemShoppingList must provide itemShoppingList"
          );
        }

        if (
          itemShoppingList.shoppingList?.nodeId === undefined ||
          itemShoppingList.shoppingList?.nodeId === null
        ) {
          throw new Error(
            "Mutation createItemShoppingList must provide itemShoppingList.shoppingList.nodeId"
          );
        }

        cache.writeFragment(ItemShoppingListFragmentDoc, itemShoppingList);
        cache.updateQuery(
          {
            query: ShoppingListByNodeIdDocument,
            variables: {
              nodeId: itemShoppingList.shoppingList.nodeId,
            },
          },
          (data: ShoppingListByNodeIdQuery | null) => {
            if (data) {
              data.shoppingListByNodeId?.itemShoppingLists.nodes.push(
                itemShoppingList
              );
            }
            return data;
          }
        );
      },
    },
  },
  optimistic: {
    deleteItemShoppingListByNodeId: (
      variables: MutationDeleteItemByNodeIdArgs,
      cache: Cache
    ) => {
      cache.invalidate({
        __typename: "ItemShoppingList",
        id: variables.input.nodeId,
      });

      return { __typename: "itemShoppingList" };
    },
    createItemShoppingList: (
      { input: { itemShoppingList } }: MutationCreateItemShoppingListArgs,
      cache
    ): CreateItemShoppingListFragment => {
      const shoppingListId: number | undefined = itemShoppingList.shoppingListId
        ? itemShoppingList.shoppingListId
        : (decodeNodeId(
            itemShoppingList.shoppingListToShoppingListId?.connectByNodeId
              ?.nodeId
          ) ?? [])[1];

      if (shoppingListId === undefined) {
        throw new Error("Request doesn't contain a resolvable shoppingListId");
      }

      const shoppingListNodeId = itemShoppingList.shoppingListToShoppingListId
        ?.connectByNodeId?.nodeId
        ? itemShoppingList.shoppingListToShoppingListId?.connectByNodeId?.nodeId
        : (cache.resolve(
            {
              __typename: "ShoppingList",
              id: itemShoppingList.shoppingListId,
            },
            "nodeId"
          ) as string | undefined);

      if (shoppingListNodeId === undefined) {
        throw new Error(
          "Request doesn't contain a resolvable shoppingListNodeId"
        );
      }

      const itemsQuery: ItemsQuery | null = cache.readQuery({
        query: ItemsDocument,
      });

      const nextItemId =
        (itemsQuery?.items?.nodes
          .map((item) => item?.id)
          .sort()
          .pop() ?? 0) + 1;

      const newNodeId = encodeNodeId(
        "ItemShoppingList",
        itemShoppingList.itemId,
        shoppingListId
      );

      const item = cache.readFragment(ItemFragmentDoc, {
        id: itemShoppingList.itemId,
      }) as ItemFragment | null;

      if (item === null) {
        throw new Error("Can't resolve existing item");
      }

      const newEntry: ItemShoppingListFragment = {
        nodeId: newNodeId,
        id: newNodeId,
        item,
        additionalInformations: null,
        shoppingList: {
          id: shoppingListId,
          nodeId: shoppingListNodeId,
          __typename: "ShoppingList",
        },
        __typename: "ItemShoppingList",
      } as const;

      return {
        itemShoppingList: {
          ...newEntry,
        },
        __typename: "CreateItemShoppingListPayload",
      };
    },
  },
});

export const graphqlClient = createClient({
  url: `${process.env.PUBLIC_URL ?? "localhost"}/graphql`,
  exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange],
  requestPolicy: "cache-and-network",
});
