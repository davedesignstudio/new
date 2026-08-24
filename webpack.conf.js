import webpack from "webpack";
import path from "path";
import crypto from "crypto";

const createHash = crypto.createHash;
crypto.createHash = algorithm =>
  createHash.call(crypto, algorithm === "md4" ? "sha256" : algorithm);

export default {
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      { test: /\.json$/, loader: "json-loader" },
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch:
        "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    })
  ],

  context: path.join(__dirname, "src"),
  entry: {
    app: ["./js/app"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals: [/^vendor\/.+\.js$/]
};
