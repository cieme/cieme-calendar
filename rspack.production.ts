// @ts-check

import { Configuration } from "@rspack/cli";
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./rspack.base");
const config: Configuration = {
  mode: "production",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "./cieme-calendar"),
    clean: true,
    filename: "bundle-[hash].js",
    chunkFilename: "[id]-[hash].js",
  },
};
export = merge(baseConfig, config);
