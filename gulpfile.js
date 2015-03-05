// Load node modules.
var through = require('through2');
var path = require('path');
var swig = require('swig');
var marked = require('marked');

// Load Gulp plugins.
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var frontMatter = require('gulp-front-matter');
var webserver = require('gulp-webserver');

// Load config file.
var config = require('./config');

// Create the styleguide object.
var styleguide = config;
var componentsPath = config.componentsPath;

// Fix stylesheetPath.
//styleguide.stylesheetPath = __dirname + '/' + styleguide.stylesheetPath;

// Gulp 'clean' task : Clean the public dir.
gulp.task('clean', function() {
  return gulp.src('public/**/*', {read: false})
    .pipe(clean());
});

// Gulp 'assets' tasks: copy the assets dir to public.
gulp.task('assets', ['clean'], function() {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('public'));
})

// Build the component pages.
gulp.task('build:components', ['clean'], function() {
  return gulp.src(componentsPath)
    .pipe(frontMatter({ property: 'component'}))
    .pipe(getComponents())
    .pipe(markdown())
//    .pipe(applyTemplate('./src/templates/component.html'))
//    .pipe(rename(function (path) {
//      path.dirname = "";
//    }))
//    .pipe(gulp.dest('public/components'));
});

// Build the index page.
gulp.task('build:index', ['build:components'], function() {
  return dummy('index.html')
    .pipe(applyTemplate('./src/templates/index.html'))
    .pipe(gulp.dest('public'));
})

// Gulp 'webserver' task: setups the webserver and enable livereload.
gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

// Gulp 'watch' task
gulp.task('watch', function () {
  var componentsWatchPath = componentsPath.replace('*.md', '*');
  gulp.watch(['src/**/*', componentsWatchPath], [
    'clean',
    'assets',
    'build:index'
  ]);
});

// Gulp 'default' task.
gulp.task('default', [
  'clean',
  'assets',
  'build:index',
  'webserver',
  'watch'
]);

function getComponents() {
  var components = [];
  return through.obj(function (file, enc, cb) {
      file.component.content = marked(file.contents.toString());
      components.push(file.component)
      this.push(file);
      cb();
    },
    function (cb) {
      styleguide.components = components;
      cb();
    });
}

function applyTemplate(templateFile) {
  var tpl = swig.compileFile(path.join(__dirname, templateFile));

  return through.obj(function (file, enc, cb) {
    // Rendering a component.
    if (file.component) {
      var data = {
        component: file.component,
        content: markdown(file.contents.toString())
      };
    }
    else {
      // Rendering index.html
      var data = {
        styleguide: styleguide
      };
    }
    file.contents = new Buffer(tpl(data), 'utf8');
    this.push(file);
    cb();
  });
}

function dummy(file) {
  var stream = through.obj(function(file, enc, cb) {
    this.push(file);
    cb();
  });

  if (styleguide) {
    var file = new gutil.File({
      path: file,
      contents: new Buffer('')
    });
    stream.write(file);
  }

  stream.end();
  stream.emit("end");

  return stream;
}

