"use strict";
var path = require("path")
  , webpack = require("webpack");

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

  // module: {
  //   loaders: [
  //     { test: /\.js$/, exclude: /(node_modules|bower_components)/ }
  //   ]
  // },

  resolve: {
    root: ["bower_components"],
    modulesDirectories: [nodedir, bowerdir],
    alias: {
      "gfCzApp$": "gfCzApp/app",
      "gfCzApp": appdir,
      "angular$": "gfCzApp/angular-exporter.js"
    },
    extensions: ["", ".webpack.js", ".web.js", ".module.js", ".js"],
    plugins: [
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]
  },

};
