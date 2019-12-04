var path = require('path');

module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    entry: {
      gallery: './src/js/components/presentational/gallery.jsx'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/public/js'
    },
    resolve: {alias: {root: path.resolve('.')}}
  }  