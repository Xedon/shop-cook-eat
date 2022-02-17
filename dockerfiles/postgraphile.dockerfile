FROM node:16 as builder

WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine

WORKDIR /app

RUN addgroup app && adduser -D -H -G app app && chown app:app /app 

USER app

COPY --from=builder --chown=app:app /app/dist/ /app/
COPY --from=builder --chown=app:app /app/package.json /app/yarn.lock ./
RUN yarn install --production && yarn cache clean


EXPOSE 8080
CMD [ "node", "index.js" ]