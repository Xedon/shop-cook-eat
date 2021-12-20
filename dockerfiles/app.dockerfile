FROM node:16-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY .env.production ./
COPY public public/
COPY src src/
RUN yarn build

# production environment
FROM nginxinc/nginx-unprivileged:1.18
COPY --from=builder /app/build /usr/share/nginx/html
# new
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]