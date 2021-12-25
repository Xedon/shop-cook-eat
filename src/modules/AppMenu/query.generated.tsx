import * as Types from "../../types";

import { gql } from "graphql.macro";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SearchForItemsQueryVariables = Types.Exact<{
  includesInsensitive?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type SearchForItemsQuery = {
  __typename?: "Query";
  items?:
    | {
        __typename?: "ItemsConnection";
        nodes: Array<
          | {
              __typename?: "Item";
              id: number;
              nodeId: string;
              name: string;
              itemShoppingLists: {
                __typename?: "ItemShoppingListsConnection";
                nodes: Array<
                  | {
                      __typename?: "ItemShoppingList";
                      shoppingList?:
                        | { __typename?: "ShoppingList"; nodeId: string }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >;
              };
            }
          | null
          | undefined
        >;
      }
    | null
    | undefined;
};

export const SearchForItemsDocument = gql`
  query SearchForItems($includesInsensitive: String) {
    items(filter: { name: { includesInsensitive: $includesInsensitive } }) {
      nodes {
        id
        nodeId
        name
        itemShoppingLists {
          nodes {
            shoppingList {
              nodeId
            }
          }
        }
      }
    }
  }
`;

export function useSearchForItemsQuery(
  options: Omit<Urql.UseQueryArgs<SearchForItemsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<SearchForItemsQuery>({
    query: SearchForItemsDocument,
    ...options,
  });
}
