import { createClient } from "urql";

export const graphqlClient = createClient({
  url: `${process.env.PUBLIC_URL ?? "localhost"}/graphql`,
  requestPolicy:
    "network-only" /* skip double caching because the service worker will do that */,
});
