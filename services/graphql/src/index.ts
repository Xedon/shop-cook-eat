import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import {
  postgraphile,
  PostGraphileResponseFastify3,
  PostGraphileResponse,
} from "postgraphile";

import fastifyJwt from "fastify-jwt";
import { readFileSync } from "fs";
import path from "path";
import fastifyCookie from "fastify-cookie";

import ManyToManyPlugin from "@graphile-contrib/pg-many-to-many";
import SimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
//@ts-ignore
import NestedMutationsPlugin from "postgraphile-plugin-nested-mutations";
import {
  additionalGraphQLContextFromRequest,
  AuthPlugin,
} from "./plugins/AuthPlugin";
import { TokenPayload } from "google-auth-library";
import fastifyBlipp from "fastify-blipp";
import fastifyEnv, { fastifyEnvOpt } from "fastify-env";

const fastify = Fastify({ logger: true });
declare module "fastify" {
  interface Config {
    PGHOST: string;
    PPGPORT: number;
    PGUSER: string;
    PGPASSWORD: string;
    PGDATABASE: string;
    PGSCHEMA: string;
    UNPRIVILEGED_PGUSER: string;
    UNPRIVILEGED_PGPASSWORD: string;
    JWT_ISS: string;
    GOOGLE_CLIENT_KEY: string;
    DEV: boolean;
  }
  interface FastifyInstance {
    config: Config;
  }
}

const schema = {
  type: "object",
  required: [
    "PGHOST",
    "PGUSER",
    "PGPASSWORD",
    "PGDATABASE",
    "PGSCHEMA",
    "UNPRIVILEGED_PGUSER",
    "UNPRIVILEGED_PGPASSWORD",
    "JWT_ISS",
    "GOOGLE_CLIENT_KEY",
    "DEV",
  ],
  properties: {
    PGHOST: {
      type: "string",
    },
    PPGPORT: {
      type: "number",
      default: 5432,
    },
    PGUSER: {
      type: "string",
    },
    PGPASSWORD: {
      type: "string",
    },
    PGDATABASE: {
      type: "string",
    },
    PGSCHEMA: {
      type: "string",
      default: "public",
    },
    UNPRIVILEGED_PGUSER: {
      type: "string",
    },
    UNPRIVILEGED_PGPASSWORD: {
      type: "string",
    },
    JWT_ISS: {
      type: "string",
    },
    GOOGLE_CLIENT_KEY: {
      type: "string",
    },
    DEV: {
      type: "boolean",
      default: false,
    },
  },
};

const options: fastifyEnvOpt = {
  schema: schema,
  dotenv: true,
  env: true,
};

fastify.register(fastifyEnv, options).after((err) => {
  if (err) {
    fastify.log.error(String(err));
    process.exit(1);
  }

  fastify.register(fastifyCookie);
  fastify.register(fastifyBlipp);

  fastify.register(fastifyJwt, {
    cookie: {
      cookieName: "auth",
      signed: false,
    },
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
    sign: { algorithm: "RS256", sub: "graphql", iss: fastify.config.JWT_ISS },
    verify: {
      algorithms: ["RS256"],
      allowedSub: "graphql",
      allowedIss: fastify.config.JWT_ISS,
    },
    decode: { complete: true },
  });

  const middleware = postgraphile(
    {
      host: fastify.config.PGHOST,
      port: fastify.config.PPGPORT,
      user: fastify.config.PGUSER,
      password: fastify.config.PGPASSWORD,
      database: fastify.config.PGDATABASE,
    },
    fastify.config.PGSCHEMA,
    {
      enhanceGraphiql: fastify.config.DEV,
      graphiql: fastify.config.DEV,
      allowExplain: fastify.config.DEV,
      ignoreRBAC: false,
      watchPg: fastify.config.DEV,
      auth: { googleClientKey: fastify.config.GOOGLE_CLIENT_KEY },
      pgSettings: async (req) => {
        if (!req.headers.cookie) {
          return { userId: null };
        }
        const token = fastify.parseCookie(req.headers.cookie)["auth"];

        if (!token) {
          return { userId: null };
        }

        const decodedToken = fastify.jwt.decode<TokenPayload>(token);

        if (!decodedToken) {
          return { userId: null };
        }

        return {
          userId: decodedToken.sub,
        };
      },
      appendPlugins: [
        ManyToManyPlugin,
        SimplifyInflectorPlugin,
        ConnectionFilterPlugin,
        NestedMutationsPlugin,
        AuthPlugin,
      ],
      additionalGraphQLContextFromRequest:
        additionalGraphQLContextFromRequest(fastify),
    }
  );

  /**
   * Converts a PostGraphile route handler into a Fastify request handler.
   */
  const convertHandler =
    (handler: (res: PostGraphileResponse) => Promise<void>) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
      return handler(new PostGraphileResponseFastify3(request, reply));
    };

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
      fastify.get(
        "/favicon.ico",
        convertHandler(middleware.faviconRouteHandler)
      );
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
});
fastify.listen(5000, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(String(err));
    process.exit(1);
  }
  fastify.log.info(`PostGraphile available at ${address}`);
  fastify.blipp();
});
