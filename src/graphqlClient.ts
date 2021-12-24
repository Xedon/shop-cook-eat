import { createClient, dedupExchange, fetchExchange } from "urql";
import { Cache, offlineExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import introspection from "./generated/introspection.json";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";
import { CreateItemShoppingListInput, DeleteItemByNodeIdInput } from "./types";
import {
  ShoppingListByNodeIdDocument,
  ShoppingListByNodeIdQuery,
} from "./modules/ShoppingList/query.generated";

const storage = makeDefaultStorage({
  idbName: "graphcache-v3",
  maxAge: 1,
});

const cache = offlineExchange({
  schema: introspection as any,
  storage,
  updates: {
    /* ... */
  },
  optimistic: {
    deleteItemShoppingListByNodeId: (variables, cache: Cache) => {
      const input = variables.input as DeleteItemByNodeIdInput;

      cache.invalidate({
        __typename: "ItemShoppingList",
        id: input.nodeId,
      });

      return { __typename: "itemShoppingList" };
    },
    createItemShoppingList: (variables, cache) => {
      const input = variables.input as CreateItemShoppingListInput;
      const shoppingListNodeId = cache.resolve(
        {
          __typename: "ShoppingList",
          id: input.itemShoppingList.shoppingListId,
        },
        "nodeId"
      );

      const newEntry = {
        nodeId: "WyJpdGVtX3Nob3BwaW5nX2xpc3RzIiwxLDFd",
        id: "WyJpdGVtX3Nob3BwaW5nX2xpc3RzIiwxLDFd",
        item: {
          id: 1,
          name: "Bread",
          nodeId: "WyJpdGVtcyIsMV0=",
          __typename: "Item",
        },
        additionalInformations: "",
        __typename: "ItemShoppingList",
      } as const;

      cache.updateQuery(
        {
          query: ShoppingListByNodeIdDocument,
          variables: { nodeId: shoppingListNodeId },
        },
        (data: ShoppingListByNodeIdQuery | null) => {
          if (data) {
            data.shoppingListByNodeId?.itemShoppingLists.nodes.push(newEntry);
          }
          return data;
        }
      );

      return null;
    },
  },
});

export const graphqlClient = createClient({
  url: `${process.env.PUBLIC_URL ?? "localhost"}/graphql`,
  exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange],
  requestPolicy: "cache-and-network",
});
