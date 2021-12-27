import * as Types from "../../types";

import { gql } from "graphql.macro";
import {
  ShoppingListFragmentDoc,
  ItemFragmentDoc,
} from "../../graphql/fragments.generated";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateShoppingListMutationVariables = Types.Exact<{
  name: Types.Scalars["String"];
}>;

export type CreateShoppingListMutation = {
  __typename?: "Mutation";
  createShoppingList?:
    | {
        __typename: "CreateShoppingListPayload";
        shoppingList?:
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
                            category?:
                              | {
                                  __typename: "ItemCategory";
                                  id: number;
                                  nodeId: string;
                                  name: string;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined;
                      shoppingList?:
                        | {
                            __typename: "ShoppingList";
                            id: number;
                            nodeId: string;
                          }
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
                      id: number;
                      nodeId: string;
                      name: string;
                      category?:
                        | {
                            __typename: "ItemCategory";
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
      }
    | null
    | undefined;
};

export const CreateShoppingListDocument = gql`
  mutation CreateShoppingList($name: String!) {
    createShoppingList(input: { shoppingList: { name: $name } }) {
      shoppingList {
        ...ShoppingList
      }
      __typename
    }
  }
  ${ShoppingListFragmentDoc}
`;

export function useCreateShoppingListMutation() {
  return Urql.useMutation<
    CreateShoppingListMutation,
    CreateShoppingListMutationVariables
  >(CreateShoppingListDocument);
}
