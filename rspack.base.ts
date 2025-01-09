// @ts-check

import { Configuration } from "@rspack/cli";
const rspack = require("@rspack/core");
const path = require("path");
const config: Configuration = {
  target: "web",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
    library: {
      name: "CiemeCalendar",
      type: "umd",
      umdNamedDefine: true,
    },
  },
  devServer: {
    hot: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
  },
  experiments: {
    css: true,
  },
  module: {
    defaultRules: [
      "...", // 使用 "..." 来引用 Rspack 默认规则
    ],
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  pragma: "React.createElement",
                  pragmaFrag: "React.Fragment",
                  throwIfNamespace: true,
                  development: false,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "sass-loader",
            options: {
              // 同时使用 `modern-compiler` 和 `sass-embedded` 可以显著提升构建性能
              // 需要 `sass-loader >= 14.2.1`
              api: "modern-compiler",
              implementation: require.resolve("sass-embedded"),
            },
          },
        ],
        type: "css/auto",
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      title: "RSPACK",
      template: "./public/index.html",
      scriptLoading: "blocking",
    }),
  ],
};
export = config;
