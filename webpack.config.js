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

var projects = require('./public/json/projects.json');
var frontEnd = projects.front_end;
var frontEndArray = [];

for (let projectKey in frontEnd){
  let project = frontEnd[projectKey];
  let newElement = {
    name: projectKey,
    entry: {},
    output: {
      filename: '[name].js',
      path: __dirname + '/public/project-files/front-end/' + project.route
    }
  }
  newElement.entry[project.file] = './public/project-files/front-end/' 
    + project.route  + '/' + project.file + '.jsx'
  frontEndArray.push(Object.assign({}, config, newElement));
}

module.exports = [main].concat(frontEndArray);