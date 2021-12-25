import * as Types from "../../types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AddItemToShoppingListByNodeIdMutationVariables = Types.Exact<{
  itemId: Types.Scalars["BigInt"];
  shoppingListNodeId: Types.Scalars["ID"];
}>;

export type AddItemToShoppingListByNodeIdMutation = {
  __typename?: "Mutation";
  createItemShoppingList?:
    | { __typename: "CreateItemShoppingListPayload" }
    | null
    | undefined;
};

export type CreateItemAndAddToShoppingListMutationVariables = Types.Exact<{
  itemName: Types.Scalars["String"];
  categoryId: Types.Scalars["BigInt"];
  shoppingListNodeId: Types.Scalars["ID"];
}>;

export type CreateItemAndAddToShoppingListMutation = {
  __typename?: "Mutation";
  createItemShoppingList?:
    | {
        __typename: "CreateItemShoppingListPayload";
        itemShoppingList?:
          | {
              __typename: "ItemShoppingList";
              additionalInformations?: string | null | undefined;
              itemId: any;
              nodeId: string;
              item?:
                | {
                    __typename: "Item";
                    name: string;
                    nodeId: string;
                    id: number;
                    category?:
                      | { __typename: "ItemCategory"; nodeId: string }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export const AddItemToShoppingListByNodeIdDocument = gql`
  mutation AddItemToShoppingListByNodeId(
    $itemId: BigInt!
    $shoppingListNodeId: ID!
  ) {
    createItemShoppingList(
      input: {
        itemShoppingList: {
          itemId: $itemId
          shoppingListToShoppingListId: {
            connectByNodeId: { nodeId: $shoppingListNodeId }
          }
        }
      }
    ) {
      __typename
    }
  }
`;

export function useAddItemToShoppingListByNodeIdMutation() {
  return Urql.useMutation<
    AddItemToShoppingListByNodeIdMutation,
    AddItemToShoppingListByNodeIdMutationVariables
  >(AddItemToShoppingListByNodeIdDocument);
}
export const CreateItemAndAddToShoppingListDocument = gql`
  mutation CreateItemAndAddToShoppingList(
    $itemName: String!
    $categoryId: BigInt!
    $shoppingListNodeId: ID!
  ) {
    createItemShoppingList(
      input: {
        itemShoppingList: {
          itemToItemId: { create: { name: $itemName, categoryId: $categoryId } }
          shoppingListToShoppingListId: {
            connectByNodeId: { nodeId: $shoppingListNodeId }
          }
        }
      }
    ) {
      itemShoppingList {
        additionalInformations
        itemId
        nodeId
        item {
          name
          nodeId
          id
          category {
            nodeId
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

export function useCreateItemAndAddToShoppingListMutation() {
  return Urql.useMutation<
    CreateItemAndAddToShoppingListMutation,
    CreateItemAndAddToShoppingListMutationVariables
  >(CreateItemAndAddToShoppingListDocument);
}
