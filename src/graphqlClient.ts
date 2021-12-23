import { createClient, dedupExchange, fetchExchange } from "urql";
import { offlineExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import introspection from "./generated/introspection.json";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";

const storage = makeDefaultStorage({
  idbName: "graphcache-v3",
  maxAge: 1,
});

const cache = offlineExchange({
  schema: introspection as any,
  storage,
  updates: {
    /* ... */
  },
  optimistic: {
    /* ... */
  },
});

export const graphqlClient = createClient({
  url: `${process.env.PUBLIC_URL ?? "localhost"}/graphql`,
  exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange],
  requestPolicy: "cache-and-network",
});
