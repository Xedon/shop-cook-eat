import * as Types from "../../types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ShoppingListsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ShoppingListsQuery = {
  __typename?: "Query";
  shoppingLists?:
    | {
        __typename: "ShoppingListsConnection";
        nodes: Array<
          | {
              __typename: "ShoppingList";
              id: number;
              nodeId: string;
              name: string;
            }
          | null
          | undefined
        >;
      }
    | null
    | undefined;
};

export const ShoppingListsDocument = gql`
  query ShoppingLists {
    shoppingLists {
      nodes {
        id
        nodeId
        name
        __typename
      }
      __typename
    }
  }
`;

export function useShoppingListsQuery(
  options: Omit<Urql.UseQueryArgs<ShoppingListsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ShoppingListsQuery>({
    query: ShoppingListsDocument,
    ...options,
  });
}
