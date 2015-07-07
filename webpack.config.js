"use strict";
var path = require("path")
  , webpack = require("webpack")
  , HashPlugin = require('hash-webpack-plugin');

var appdir = path.join(__dirname, "js")
  , targetdir = path.join(__dirname, "target")
  , bowerdir = path.join(__dirname, "bower_components")
  , nodedir = path.join(__dirname, "node_modules");

module.exports = {
  debug: true,
  devtool: "#source-map",
  watchOptions: {
      aggregateTimeout: 500
  },

  entry: "./app/js/app.js",

  output: {
    path: targetdir,
    filename: "bundle.js" 
  },
};
