FROM node:16-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY public public/
COPY src src/
RUN yarn build

# production environment
FROM caddy:2
COPY --from=builder /app/build /usr/share/caddy
RUN cat /etc/caddy/Caddyfile
COPY dockerfiles/caddy/Caddyfile /etc/caddy/Caddyfile

EXPOSE 8080 
EXPOSE 8443 

