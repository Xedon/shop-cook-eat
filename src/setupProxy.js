const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND,
      changeOrigin: true,
    })
  );
};
