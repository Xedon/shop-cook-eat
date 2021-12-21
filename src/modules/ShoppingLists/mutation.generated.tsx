import * as Types from "../../types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateShoppingListMutationVariables = Types.Exact<{
  name: Types.Scalars["String"];
}>;

export type CreateShoppingListMutation = {
  __typename?: "Mutation";
  createShoppingList?:
    | {
        __typename?: "CreateShoppingListPayload";
        shoppingList?:
          | { __typename?: "ShoppingList"; nodeId: string; name: string }
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
        nodeId
        name
      }
    }
  }
`;

export function useCreateShoppingListMutation() {
  return Urql.useMutation<
    CreateShoppingListMutation,
    CreateShoppingListMutationVariables
  >(CreateShoppingListDocument);
}
