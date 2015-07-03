"use strict";

var path = require("path");

var gulp = require("gulp")
  , gutil = require("gulp-util")
  , install = require("gulp-install")
  , runSequence = require("run-sequence")
  , del = require("del")
/* Styles */
  , minifyCss = require("gulp-minify-css")

/* Javascript */
  , gwebpack = require("gulp-webpack")
  , webpack = require("webpack")
  , webpackConfig = require("webpack-config")
    ;

require('gulp-release-tasks')(gulp);

function isProduction() {
    return gutil.env.production;
}

gutil.log("Building in", isProduction() ? "PRODUCTION" : "DEVELOPMENT", "mode");

var appdir = "./app"
  , targetdir = "./target"
  , nodedir = "./node_modules"
  , bowerdir = "./bower_components"

  , htmlGlob = path.join(appdir, "**", "*.html")
  , jsGlob = path.join(appdir, "**", "*.js")
  , cssGlob = path.join(__dirname, "styles", "*.css")
  , imagesGlob = path.join(__dirname, "images", "*")
  , appConfigJs = path.join(appdir, "config.js")
  , watchDelay = 500

  /* Webpack options */
  , webpackConfigFile = "./webpack.config.js"

  , webpackOverrides = {
      watchOptions: {
          aggregateTimeout: watchDelay
      },
      verbose: !!gutil.env.verbose,
      progress: true,
      stats: {
        hash: true,
        timings: true
      }
    }
;

gulp.task("static", function() {
    gulp.src([htmlGlob])
        .pipe(gulp.dest(targetdir));
    gulp.src([cssGlob])
        .pipe(gulp.dest(path.join(targetdir, "styles")));
    gulp.src([imagesGlob])
        .pipe(gulp.dest(path.join(targetdir, "images")));
    gulp.src(appConfigJs)
        .pipe(gulp.dest(targetdir));
});


function webpackFullConfig(moreOptions) {
    return webpackConfig
        .fromFile(webpackConfigFile)
        .extend(webpackOverrides)
        .merge(moreOptions || {});
}

gulp.task("webpack", function() {
    return gulp.src([]) // [] in order to use entries from webpack config file
               .pipe(gwebpack(webpackFullConfig(), webpack))
               .pipe(gulp.dest(targetdir));
});


gulp.task("install", function() {
    var descriptors = ["./bower.json", "./package.json"];
    return gulp.src(descriptors)
               .pipe(install());
});

gulp.task("clean", function(cb) {
    del([targetdir], cb);
});

gulp.task("default", ["static", "webpack"]);

gulp.task("rebuild", function(cb) {
    return runSequence("clean", "install", "default", cb);
});
