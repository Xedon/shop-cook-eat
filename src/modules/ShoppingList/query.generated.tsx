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
        name: string;
        itemShoppingLists: {
          __typename?: "ItemShoppingListsConnection";
          nodes: Array<
            | {
                __typename?: "ItemShoppingList";
                itemId: any;
                additionalInformations?: string | null | undefined;
                item?:
                  | { __typename?: "Item"; itemId: number; name: string }
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

export const ShoppingListByNodeIdDocument = gql`
  query ShoppingListByNodeId($nodeId: ID!) {
    shoppingListByNodeId(nodeId: $nodeId) {
      name
      itemShoppingLists {
        nodes {
          itemId
          item {
            itemId
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
