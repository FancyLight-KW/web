// setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/requests",
    createProxyMiddleware({
      target: "http://3.34.2.162:5000",
      changeOrigin: true,
    })
  );
};
