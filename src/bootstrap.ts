import { createGraphqlClient } from "./graphqlClient";
import { createStore } from "./state/store";
import { GoogleAuthClient } from "./tools/GoogleAuthClientWrapper";

export const boot = () => {
  const googleAuthClient = new GoogleAuthClient();
  const graphqlClient = createGraphqlClient(googleAuthClient);
  const store = createStore(graphqlClient, googleAuthClient);
  return { store, graphqlClient };
};
