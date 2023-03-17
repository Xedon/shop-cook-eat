import {
  gql,
  makeExtendSchemaPlugin,
  makePluginByCombiningPlugins,
  makeWrapResolversPlugin,
} from "postgraphile";
import { IncomingMessage } from "http";
import { FastifyInstance } from "fastify";
import { AuthErrors, buildError } from "../errors";
import { PoolClient } from "pg";
import { insertAuth0AccoutEntry, selectAuth0AccountEntry } from "../querys";
import fetch from "node-fetch";
import crypto from "crypto";

declare module "postgraphile" {
  interface PostGraphileOptions {
    auth0UserEnpoint: string;
  }
}

interface Auth0Userinfo {
  sub: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
}

const permissionsPlugin = makeWrapResolversPlugin(
  (ctx) => {
    if (ctx.scope.isRootMutation || ctx.scope.isRootQuery) {
      return ctx.scope.fieldName;
    }
    // return null to not wrap this non-root resolver
    return null;
  },
  (_) => async (resolve, source, args, context: ContextType, info) => {
    await context.authenticate().catch((e: Error) => {
      if (e.message.match("Missing Authorization HTTP header")) {
        throw buildError(AuthErrors.TOKEN_MISSING);
      }
      throw buildError(AuthErrors.TOKEN_INVALLID);
    });

    return resolve(source, args, context, info);
  }
);

const whoamiAuth0Plugin = makeExtendSchemaPlugin((_, __) => {
  return {
    typeDefs: gql`
      type TokenPayload {
        name: String!
        email: String!
        profilePictureUrl: String
      }

      extend type Query {
        whoami: TokenPayload
      }
    `,
    resolvers: {
      Query: {
        whoami: async (
          _: any,
          __: unknown,
          context: ContextType & { pgClient: PoolClient }
        ) => {
          const { jwt, pgClient, auth0Token, config, log } = context;

          if (!jwt || !auth0Token) {
            return null;
          }

          const auth0Id = crypto
            .createHash("sha256")
            .update(jwt?.sub ?? "")
            .digest("hex");

          const account = await selectAuth0AccountEntry(pgClient, { auth0Id });
          if (!account) {
            const remoteAccountResp = await fetch(config.AUTH0_USER_ENDPOINT, {
              headers: { authorization: `Bearer ${auth0Token}` },
            });

            if (!remoteAccountResp.ok) {
              return null;
            }

            const { name, email, picture } =
              (await remoteAccountResp.json()) as Auth0Userinfo;

            await insertAuth0AccoutEntry(pgClient, {
              auth0Id,
              email,
              name,
              profilePictureUrl: picture,
            });

            return {
              name: name,
              email: email,
              profilePictureUrl: picture,
            };
          }

          return {
            name: account?.name,
            email: account?.email,
            profilePictureUrl: account?.profilePictureUrl,
          };
        },
      },
    },
  };
});

export const AuthPlugin = makePluginByCombiningPlugins(
  permissionsPlugin,
  whoamiAuth0Plugin
);

const createAdditionalContext = (
  req: IncomingMessage,
  fastify: FastifyInstance
) => {
  const authorizationhHeader = req.headers.authorization?.replace(
    "Bearer ",
    ""
  );
  return {
    config: fastify.config,
    log: fastify.log,
    // request should be suffiten enough even if the types does not match and the response is never used so its not important to provide one
    auth0Token: authorizationhHeader,
    authenticate: () =>
      fastify.authenticate(req._fastifyRequest as any, undefined as any),
    jwt: authorizationhHeader
      ? fastify.jwt.decode<{
          iss: string;
          sub: string;
          aud: string[];
          iat: number;
          exp: number;
          azp: string;
          scope: string;
        }>(authorizationhHeader)
      : null,
  };
};

export type ContextType = ReturnType<typeof createAdditionalContext>;

export const additionalGraphQLContextFromRequest = (fastify: FastifyInstance) =>
  async function (req: IncomingMessage) {
    return createAdditionalContext(req, fastify);
  };
