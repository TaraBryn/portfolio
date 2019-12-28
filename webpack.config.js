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

var proj_cofig = [];
for(project in projects.front_end) {
  let  = project.file
  proj_cofig.push({
    name: project.name,
    entry: {}
  })
}

var projects = require('./public/json/projects.json');
var frontEnd = projects.front_end;
var frontEndArray = [];

for (let project in frontEnd){
  let newElement = {
    name: project,
    entry: {},
    output: {
      filename: '[name].js',
      path: __dirname + '/pubic/project-files/front-end/' + frontEnd[project].route
    }
  }
  newElement.entry[frontEnd[project].file] = './public/project-files/front-end/' + frontEnd[project].route;
  frontEndArray.push(Object.assign({}, config, newElement));
}

module.exports = [main].concat(frontEndArray);