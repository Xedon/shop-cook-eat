import * as Types from "../types";

import { gql } from "graphql.macro";
export type ItemFragment = {
  __typename: "Item";
  id: any;
  nodeId: string;
  name: string;
  category?:
    | { __typename: "ItemCategory"; id: any; nodeId: string; name: string }
    | null
    | undefined;
};

export type ItemShoppingListFragment = {
  __typename: "ItemShoppingList";
  nodeId: string;
  additionalInformations?: string | null | undefined;
  id: string;
  item?:
    | {
        __typename: "Item";
        id: any;
        nodeId: string;
        name: string;
        category?:
          | {
              __typename: "ItemCategory";
              id: any;
              nodeId: string;
              name: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  shoppingList?:
    | { __typename: "ShoppingList"; id: any; nodeId: string }
    | null
    | undefined;
};

export type ItemShoppingListsConnectionFragment = {
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
              id: any;
              nodeId: string;
              name: string;
              category?:
                | {
                    __typename: "ItemCategory";
                    id: any;
                    nodeId: string;
                    name: string;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        shoppingList?:
          | { __typename: "ShoppingList"; id: any; nodeId: string }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type ShoppingListFragment = {
  __typename: "ShoppingList";
  id: any;
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
                id: any;
                nodeId: string;
                name: string;
                category?:
                  | {
                      __typename: "ItemCategory";
                      id: any;
                      nodeId: string;
                      name: string;
                    }
                  | null
                  | undefined;
              }
            | null
            | undefined;
          shoppingList?:
            | { __typename: "ShoppingList"; id: any; nodeId: string }
            | null
            | undefined;
        }
      | null
      | undefined
    >;
  };
  itemsByItemShoppingListHistoryShoppingListIdAndItemId: {
    __typename?: "ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdManyToManyConnection";
    nodes: Array<
      | {
          __typename: "Item";
          id: any;
          nodeId: string;
          name: string;
          category?:
            | {
                __typename: "ItemCategory";
                id: any;
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
};

export type CreateItemShoppingListFragment = {
  __typename: "CreateItemShoppingListPayload";
  itemShoppingList?:
    | {
        __typename: "ItemShoppingList";
        nodeId: string;
        additionalInformations?: string | null | undefined;
        id: string;
        item?:
          | {
              __typename: "Item";
              id: any;
              nodeId: string;
              name: string;
              category?:
                | {
                    __typename: "ItemCategory";
                    id: any;
                    nodeId: string;
                    name: string;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        shoppingList?:
          | { __typename: "ShoppingList"; id: any; nodeId: string }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export const ItemFragmentDoc = gql`
  fragment Item on Item {
    id
    nodeId
    name
    category {
      id
      nodeId
      name
      __typename
    }
    __typename
  }
`;
export const ItemShoppingListFragmentDoc = gql`
  fragment ItemShoppingList on ItemShoppingList {
    nodeId
    id: nodeId
    item {
      ...Item
    }
    additionalInformations
    shoppingList {
      id
      nodeId
      __typename
    }
    __typename
  }
  ${ItemFragmentDoc}
`;
export const ItemShoppingListsConnectionFragmentDoc = gql`
  fragment ItemShoppingListsConnection on ItemShoppingListsConnection {
    nodes {
      ...ItemShoppingList
    }
    __typename
  }
  ${ItemShoppingListFragmentDoc}
`;
export const ShoppingListFragmentDoc = gql`
  fragment ShoppingList on ShoppingList {
    id
    nodeId
    name
    itemShoppingLists {
      ...ItemShoppingListsConnection
    }
    __typename
    itemsByItemShoppingListHistoryShoppingListIdAndItemId {
      nodes {
        ...Item
      }
    }
  }
  ${ItemShoppingListsConnectionFragmentDoc}
  ${ItemFragmentDoc}
`;
export const CreateItemShoppingListFragmentDoc = gql`
  fragment CreateItemShoppingList on CreateItemShoppingListPayload {
    itemShoppingList {
      ...ItemShoppingList
    }
    __typename
  }
  ${ItemShoppingListFragmentDoc}
`;
