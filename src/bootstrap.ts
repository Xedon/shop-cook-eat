import { createGraphqlClient } from "./graphqlClient";
import { createStore } from "./state/store";

export const boot = () => {
  const graphqlClient = createGraphqlClient();
  const store = createStore(graphqlClient);
  return { store, graphqlClient };
};
