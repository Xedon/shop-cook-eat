import * as Types from "../../types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ShoppingListFragment = {
  __typename: "ShoppingList";
  id: number;
  nodeId: string;
  name: string;
  itemShoppingLists: {
    __typename: "ItemShoppingListsConnection";
    nodes: Array<
      | {
          __typename: "ItemShoppingList";
          nodeId: string;
          additionalInformations?: string | null | undefined;
          id: string;
          item?:
            | { __typename: "Item"; id: number; nodeId: string; name: string }
            | null
            | undefined;
        }
      | null
      | undefined
    >;
  };
};

export type ShoppingListByNodeIdQueryVariables = Types.Exact<{
  nodeId: Types.Scalars["ID"];
}>;

export type ShoppingListByNodeIdQuery = {
  __typename?: "Query";
  shoppingListByNodeId?:
    | {
        __typename: "ShoppingList";
        id: number;
        nodeId: string;
        name: string;
        itemShoppingLists: {
          __typename: "ItemShoppingListsConnection";
          nodes: Array<
            | {
                __typename: "ItemShoppingList";
                nodeId: string;
                additionalInformations?: string | null | undefined;
                id: string;
                item?:
                  | {
                      __typename: "Item";
                      id: number;
                      nodeId: string;
                      name: string;
                    }
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
        __typename: "ItemsConnection";
        nodes: Array<
          | {
              __typename: "Item";
              id: number;
              nodeId: string;
              name: string;
              category?:
                | {
                    __typename: "ItemCategory";
                    id: number;
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

export const ShoppingListFragmentDoc = gql`
  fragment ShoppingList on ShoppingList {
    id
    nodeId
    name
    itemShoppingLists {
      nodes {
        nodeId
        id: nodeId
        item {
          id
          nodeId
          name
          __typename
        }
        additionalInformations
        __typename
      }
      __typename
    }
    __typename
  }
`;
export const ShoppingListByNodeIdDocument = gql`
  query ShoppingListByNodeId($nodeId: ID!) {
    shoppingListByNodeId(nodeId: $nodeId) {
      ...ShoppingList
    }
  }
  ${ShoppingListFragmentDoc}
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
        id
        nodeId
        name
        category {
          id
          nodeId
          categroyName
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

export function useItemsQuery(
  options: Omit<Urql.UseQueryArgs<ItemsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ItemsQuery>({ query: ItemsDocument, ...options });
}
