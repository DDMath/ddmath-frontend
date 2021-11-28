import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { InjectManifest } from "workbox-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import Dotenv from "dotenv-webpack";
import path from "path";
const __dirname = path.resolve();
import webpack from "webpack";

const config = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
            plugins: ["styled-components"],
          },
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: { fs: false, os: false },
  },
  devtool: "eval-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "./public/manifest.json", to: "" },
        { from: "./public/assets/icons/favicon.ico", to: "" },
        { from: "./public/assets/icons/icon128.png", to: "" },
        { from: "./public/assets/icons/icon144.png", to: "" },
        { from: "./public/assets/icons/icon152.png", to: "" },
        { from: "./public/assets/icons/icon192.png", to: "" },
      ],
    }),
    new InjectManifest({
      swSrc: "./public/service-worker.js",
      swDest: "service-worker.js",
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    }),
  ],
};

export default config;
