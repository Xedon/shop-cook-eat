import * as Types from "../../types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DelteItemFromShoppingListMutationVariables = Types.Exact<{
  nodeId: Types.Scalars["ID"];
}>;

export type DelteItemFromShoppingListMutation = {
  __typename?: "Mutation";
  deleteItemShoppingListByNodeId?:
    | {
        __typename?: "DeleteItemShoppingListPayload";
        item?: { __typename?: "Item"; nodeId: string } | null | undefined;
      }
    | null
    | undefined;
};

export type AddItemToShoppingListMutationVariables = Types.Exact<{
  itemId: Types.Scalars["BigInt"];
  shoppingListId: Types.Scalars["BigInt"];
}>;

export type AddItemToShoppingListMutation = {
  __typename?: "Mutation";
  createItemShoppingList?:
    | {
        __typename?: "CreateItemShoppingListPayload";
        itemShoppingList?:
          | {
              __typename?: "ItemShoppingList";
              nodeId: string;
              item?:
                | { __typename?: "Item"; name: string; nodeId: string }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export const DelteItemFromShoppingListDocument = gql`
  mutation DelteItemFromShoppingList($nodeId: ID!) {
    deleteItemShoppingListByNodeId(input: { nodeId: $nodeId }) {
      item {
        nodeId
      }
    }
  }
`;

export function useDelteItemFromShoppingListMutation() {
  return Urql.useMutation<
    DelteItemFromShoppingListMutation,
    DelteItemFromShoppingListMutationVariables
  >(DelteItemFromShoppingListDocument);
}
export const AddItemToShoppingListDocument = gql`
  mutation AddItemToShoppingList($itemId: BigInt!, $shoppingListId: BigInt!) {
    createItemShoppingList(
      input: {
        itemShoppingList: { shoppingListId: $shoppingListId, itemId: $itemId }
      }
    ) {
      itemShoppingList {
        nodeId
        item {
          name
          nodeId
        }
      }
    }
  }
`;

export function useAddItemToShoppingListMutation() {
  return Urql.useMutation<
    AddItemToShoppingListMutation,
    AddItemToShoppingListMutationVariables
  >(AddItemToShoppingListDocument);
}
