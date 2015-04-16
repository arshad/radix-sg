// Load node modules.
var fs = require('fs');
var marked = require('marked');
var del = require('del');
var frontMatter = require('front-matter');

// Load Gulp plugins.
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var sync = require('gulp-sync')(gulp);
var data = require('gulp-data');
var webserver = require('gulp-webserver');
var swig = require('gulp-swig');

// Load config file.
var styleguide = require('./styleguide');

// Gulp 'clean' task : Clean the public dir.
//gulp.task('clean', function() {
//  del(['public/**/*']);
//  //return gulp.src('public/**/*', { read: false })
//  //  .pipe(clean(clean({force: true})));
//});

gulp.task('clean', require('del').bind(null, ['.tmp', 'public']));

// Gulp 'assets' tasks: copy the assets dir to public.
gulp.task('assets', function() {
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./public'));
});

gulp.task('build:index', function() {
  gulp.src('./src/templates/index.html')
    .pipe(data(function() {
      return buildSections();
    }))
    .pipe(swig())
    .pipe(gulp.dest('public'));
});

// Gulp 'webserver' task: setups the webserver and enable livereload.
gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 9000
    }));
});

// Gulp 'watch' task
gulp.task('watch', function () {
  //gulp.watch(['src/assets/**/*'], ['assets']);
  //gulp.watch(['src/styleguide/**/*'], ['build:index']);
  //gulp.watch(['src/templates/**/*'], ['build:index']);
  gulp.watch(['src/**/*'], ['assets', 'build:index']);
});

// Gulp 'default' task.
gulp.task('default', ['assets', 'build:index', 'webserver', 'watch']);

function buildSections() {
  var sections = [];
  styleguide.sections.map(function(section) {
    section.name = section.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    section.files = [];
    section.tree.map(function(path) {
      if (typeof path === 'string') {
        var path = './src/styleguide/' + path + '.md';
        var data = fs.readFileSync(path, 'utf8');
        var file = frontMatter(data);
        file.content = marked(file.body);
        file.attributes.name = file.attributes.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        section.files.push(file);
      }
    });
    sections.push(section);
  });
  styleguide.sections = sections;
  return styleguide;
}

