var path = require('path');

module.exports = {
    module: {
      rules: [
        {
          test: /\.(jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    entry: {
      gallery: './src/react/presentational/gallery.jsx'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/public/js',
    },
    resolve: {alias: {root: path.resolve('.')}},
    watch: true
  }  