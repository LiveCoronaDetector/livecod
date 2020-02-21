const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "public/assets", to: "assets" }]),
    new HtmlWebpackPlugin({
      title: "코로나 맵",
      template: "public/index.html"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "public")
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
