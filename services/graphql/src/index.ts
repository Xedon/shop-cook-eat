import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import {
  postgraphile,
  PostGraphileResponseFastify3,
  PostGraphileResponse,
} from "postgraphile";

import fastifyJwt from "fastify-jwt";
import { readFileSync } from "fs";
import path from "path";
import cookie from "cookie";
import fastifyCookie from "fastify-cookie";

import ManyToManyPlugin from "@graphile-contrib/pg-many-to-many";
import SimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
//@ts-ignore
import NestedMutationsPlugin from "postgraphile-plugin-nested-mutations";
import { AuthPlugin } from "./plugins/AuthPlugin";
import { IncomingMessage, ServerResponse } from "http";
import { TokenPayload } from "google-auth-library";
import { addDays } from "date-fns";
import fastifyBlipp from "fastify-blipp";

const fastify = Fastify({ logger: true });

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
  sign: { algorithm: "RS256", sub: "graphql", iss: process.env.JWT_ISS },
  verify: {
    algorithms: ["RS256"],
    allowedSub: "graphql",
    allowedIss: process.env.JWT_ISS,
  },
  decode: { complete: true },
});

const cleanTokenPayload = ({
  aud,
  exp,
  iat,
  iss,
  at_hash,
  azp,
  email_verified,
  hd,
  nonce,
  profile,
  ...rest
}: TokenPayload) => ({ ...rest });

const createAdditionalContext = (
  req: IncomingMessage,
  res: ServerResponse
) => ({
  signAuthToken: (payload: TokenPayload) =>
    fastify.jwt.sign(cleanTokenPayload(payload), {
      ...fastify.jwt.options.sign,
      expiresIn: "1d",
    }),
  signRefreshToken: (payload: TokenPayload) =>
    fastify.jwt.sign(cleanTokenPayload(payload), {
      ...fastify.jwt.options.sign,
      expiresIn: "7d",
      sub: "refreshToken",
    }),
  decodeJwt: (token: string) =>
    fastify.jwt.decode<TokenPayload>(token, fastify.jwt.options.decode),
  verifyAuthToken: () => {
    const token = fastify.parseCookie(req?.headers?.cookie ?? "")?.auth;
    return fastify.jwt.verify<TokenPayload>(token, fastify.jwt.options.verify);
  },
  verifyRefreshToken: (token: string) =>
    fastify.jwt.verify<TokenPayload>(token, {
      ...fastify.jwt.options.verify,
      allowedSub: "refreshToken",
    }),
  setAuthCookies: ({
    authToken,
    refreshToken,
  }: {
    authToken: string;
    refreshToken: string;
  }) => {
    res.setHeader("Set-Cookie", [
      cookie.serialize("auth", authToken, {
        expires: addDays(new Date(), 1),
        secure: true,
        sameSite: "strict",
      }),
      cookie.serialize("auth_refresh", refreshToken, {
        expires: addDays(new Date(), 7),
        secure: true,
        sameSite: "strict",
      }),
    ]);
  },
});

export type ContextType = ReturnType<typeof createAdditionalContext>;

async function additionalGraphQLContextFromRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  return createAdditionalContext(req, res);
}

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
    additionalGraphQLContextFromRequest,
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

fastify.listen(5000, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(String(err));
    process.exit(1);
  }
  fastify.blipp();
  fastify.log.info(
    `PostGraphiQL available at ${address}${middleware.graphiqlRoute}`
  );
});
