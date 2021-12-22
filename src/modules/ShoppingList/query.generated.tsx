import * as Types from "../../types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ShoppingListByNodeIdQueryVariables = Types.Exact<{
  nodeId: Types.Scalars["ID"];
}>;

export type ShoppingListByNodeIdQuery = {
  __typename?: "Query";
  shoppingListByNodeId?:
    | {
        __typename?: "ShoppingList";
        nodeId: string;
        shoppingListId: number;
        name: string;
        itemShoppingLists: {
          __typename?: "ItemShoppingListsConnection";
          nodes: Array<
            | {
                __typename?: "ItemShoppingList";
                nodeId: string;
                additionalInformations?: string | null | undefined;
                item?:
                  | { __typename?: "Item"; nodeId: string; name: string }
                  | null
                  | undefined;
              }
            | null
            | undefined
          >;
        };
      }
    | null
    | undefined;
};

export type ItemsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ItemsQuery = {
  __typename?: "Query";
  items?:
    | {
        __typename?: "ItemsConnection";
        nodes: Array<
          | {
              __typename?: "Item";
              itemId: number;
              nodeId: string;
              name: string;
              category?:
                | {
                    __typename?: "ItemCategory";
                    nodeId: string;
                    categroyName: string;
                  }
                | null
                | undefined;
            }
          | null
          | undefined
        >;
      }
    | null
    | undefined;
};

export const ShoppingListByNodeIdDocument = gql`
  query ShoppingListByNodeId($nodeId: ID!) {
    shoppingListByNodeId(nodeId: $nodeId) {
      nodeId
      shoppingListId
      name
      itemShoppingLists {
        nodes {
          nodeId
          item {
            nodeId
            name
          }
          additionalInformations
        }
      }
    }
  }
`;

export function useShoppingListByNodeIdQuery(
  options: Omit<
    Urql.UseQueryArgs<ShoppingListByNodeIdQueryVariables>,
    "query"
  > = {}
) {
  return Urql.useQuery<ShoppingListByNodeIdQuery>({
    query: ShoppingListByNodeIdDocument,
    ...options,
  });
}
export const ItemsDocument = gql`
  query Items {
    items {
      nodes {
        itemId
        nodeId
        name
        category {
          nodeId
          categroyName
        }
      }
    }
  }
`;

export function useItemsQuery(
  options: Omit<Urql.UseQueryArgs<ItemsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ItemsQuery>({ query: ItemsDocument, ...options });
}
