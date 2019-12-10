var path = require('path');

var config = {
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'}
      }
    ]
  }
}

var main = Object.assign({}, config, {
  name: 'main',
  entry: {gallery: './src/react/presentational/gallery.jsx'},
  output: {
    filename: '[name].js',
    path: __dirname + '/public/js'
  },
  watch: true
})

var markdown_previewer = Object.assign({}, config, {
  name: 'markdown_previewer',
  entry: {mark: './public/project-files/front-end/markdown_previewer/mark.jsx'},
  output: {
    filename: '[name].js',
    path: __dirname + '/public/project-files/front-end/markdown_previewer'
  }
})

module.exports = [main, markdown_previewer];