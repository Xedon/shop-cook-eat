import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import {
  postgraphile,
  PostGraphileResponseFastify3,
  PostGraphileResponse,
} from "postgraphile";

import fastifyJwt from "fastify-jwt";
import { readFileSync } from "fs";
import path from "path";

import ManyToManyPlugin from "@graphile-contrib/pg-many-to-many";
import SimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
//@ts-ignore
import NestedMutationsPlugin from "postgraphile-plugin-nested-mutations";

console.log(path.resolve());

const middleware = postgraphile(
  {
    host: process.env.PGHOST,
    port: Number.parseInt(process.env.PPGPORT ?? "5432", 10),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
  process.env.PGSCHEMA ?? "public",
  {
    enhanceGraphiql: Boolean(process.env.DEV),
    graphiql: Boolean(process.env.DEV),
    allowExplain: Boolean(process.env.DEV),
    ignoreRBAC: false,
    watchPg: true,
    pgSettings: async (req) => ({
      /*TODO map login*/
    }),
    appendPlugins: [
      ManyToManyPlugin,
      SimplifyInflectorPlugin,
      ConnectionFilterPlugin,
      NestedMutationsPlugin,
    ],
  }
);

const fastify = Fastify({ logger: true });

/**
 * Converts a PostGraphile route handler into a Fastify request handler.
 */
const convertHandler =
  (handler: (res: PostGraphileResponse) => Promise<void>) =>
  (request: FastifyRequest, reply: FastifyReply) =>
    handler(new PostGraphileResponseFastify3(request, reply));

// IMPORTANT: do **NOT** change these routes here; if you want to change the
// routes, do so in PostGraphile options. If you change the routes here only
// then GraphiQL won't know where to find the GraphQL endpoint and the GraphQL
// endpoint won't know where to indicate the EventStream for watch mode is.
// (There may be other problems too.)

// OPTIONS requests, for CORS/etc
fastify.options(
  middleware.graphqlRoute,
  convertHandler(middleware.graphqlRouteHandler)
);

// This is the main middleware
fastify.post(
  middleware.graphqlRoute,
  convertHandler(middleware.graphqlRouteHandler)
);

// GraphiQL, if you need it
if (middleware.options.graphiql) {
  if (middleware.graphiqlRouteHandler) {
    fastify.head(
      middleware.graphiqlRoute,
      convertHandler(middleware.graphiqlRouteHandler)
    );
    fastify.get(
      middleware.graphiqlRoute,
      convertHandler(middleware.graphiqlRouteHandler)
    );
  }
  // Remove this if you don't want the PostGraphile logo as your favicon!
  if (middleware.faviconRouteHandler) {
    fastify.get("/favicon.ico", convertHandler(middleware.faviconRouteHandler));
  }
}

// If you need watch mode, this is the route served by the
// X-GraphQL-Event-Stream header; see:
// https://github.com/graphql/graphql-over-http/issues/48
if (middleware.options.watchPg) {
  if (middleware.eventStreamRouteHandler) {
    fastify.options(
      middleware.eventStreamRoute,
      convertHandler(middleware.eventStreamRouteHandler)
    );
    fastify.get(
      middleware.eventStreamRoute,
      convertHandler(middleware.eventStreamRouteHandler)
    );
  }
}

fastify.register(fastifyJwt, {
  secret: {
    private: readFileSync(
      `${path.join(path.resolve(), "certs")}/private.key`,
      "utf8"
    ),
    public: readFileSync(
      `${path.join(path.resolve(), "certs")}/public.key`,
      "utf8"
    ),
  },
  sign: { algorithm: "RS256" },
});

fastify.listen(8080, (err, address) => {
  if (err) {
    fastify.log.error(String(err));
    process.exit(1);
  }
  fastify.log.info(
    `PostGraphiQL available at ${address}${middleware.graphiqlRoute} 🚀`
  );
});
