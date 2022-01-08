FROM node:16 as builder

WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine

RUN addgroup app && adduser -D -H -G app app

USER app

WORKDIR /app

COPY --from=builder --chown=app:app /app/dist /app
COPY --from=builder --chown=app:app /app/package.json /app/yarn.lock ./
RUN yarn install --production


EXPOSE 8080
CMD [ "node", "index.js" ]