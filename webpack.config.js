var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ],
    entry: {
      gallery: './src/js/components/presentational/gallery.jsx'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/public/js'
    },
    resolve: {alias: {root: path.resolve('.')}}
  }  