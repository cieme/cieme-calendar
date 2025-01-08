const { merge } = require("webpack-merge");
const baseConfig = require("./rspack.base.js");
/** @type {import('@rspack/cli').Configuration} */
const config = merge(baseConfig, {
  mode: "development",
  devServer: {
    hot: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    ],
  },
});
module.exports = config;
