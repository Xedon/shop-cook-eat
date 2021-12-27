import * as Types from "../../types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateShoppingListWithNameMutationVariables = Types.Exact<{
  name: Types.Scalars["String"];
}>;

export type CreateShoppingListWithNameMutation = {
  __typename?: "Mutation";
  createShoppingList?:
    | {
        __typename?: "CreateShoppingListPayload";
        shoppingList?:
          | {
              __typename?: "ShoppingList";
              id: any;
              nodeId: string;
              name: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export const CreateShoppingListWithNameDocument = gql`
  mutation CreateShoppingListWithName($name: String!) {
    createShoppingList(input: { shoppingList: { name: $name } }) {
      shoppingList {
        id
        nodeId
        name
      }
    }
  }
`;

export function useCreateShoppingListWithNameMutation() {
  return Urql.useMutation<
    CreateShoppingListWithNameMutation,
    CreateShoppingListWithNameMutationVariables
  >(CreateShoppingListWithNameDocument);
}
