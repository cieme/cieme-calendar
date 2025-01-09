// @ts-check

import { Configuration } from "@rspack/cli";
const { merge } = require("webpack-merge");
const baseConfig = require("./rspack.base");
const { TsCheckerRspackPlugin } = require("ts-checker-rspack-plugin");

const config: Configuration = {
  mode: "development",
  plugins: [new TsCheckerRspackPlugin()],
};
export = merge(baseConfig, config);
