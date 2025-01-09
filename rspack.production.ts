// @ts-check

import { Configuration } from "@rspack/cli";
const { merge } = require("webpack-merge");
const baseConfig = require("./rspack.base");
const config: Configuration = {
  mode: "production",
  devtool: false,
  output: {
    clean: true,
    filename: "bundle-[hash].js",
    chunkFilename: "[id]-[hash].js",
  },
};
export = merge(baseConfig, config);
