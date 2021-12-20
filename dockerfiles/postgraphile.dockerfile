FROM graphile/postgraphile:4-12
RUN yarn add @graphile-contrib/pg-many-to-many postgraphile-plugin-connection-filter @graphile-contrib/pg-simplify-inflector postgraphile-plugin-nested-mutations
