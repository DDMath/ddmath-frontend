import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { InjectManifest } from "workbox-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import Dotenv from "dotenv-webpack";

import path from "path";
const __dirname = path.resolve();
import webpack from "webpack";

const config = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].js",
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
  devServer: {
    port: 9000,
    static: {
      directory: path.join(__dirname, "public"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new Dotenv(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new InjectManifest({
      swSrc: "./public/service-worker.js",
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    }),
    new BundleAnalyzerPlugin(),
  ],
};

export default config;
