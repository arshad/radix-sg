// Load node modules.
var fs = require('fs');
var marked = require('marked');
var del = require('del');
var frontMatter = require('front-matter');

// Load Gulp plugins.
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var gutil = require('gulp-util');
var data = require('gulp-data');
var webserver = require('gulp-webserver');
var swig = require('gulp-swig');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Load config file.
var styleguide = require('./styleguide');

// Gulp 'build' task.
gulp.task('build', function() {
  gulp.src('./src/templates/index.html')
    .pipe(data(function() {
      return buildSections();
    }))
    .pipe(swig())
    .pipe(gulp.dest('public'));
});

// Gulp 'sass' task
gulp.task('sass', function() {
  return gulp.src('./src/assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('js', function(){
  return gulp.src('./src/assets/javascripts/**/*.js')
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('public/assets/javascripts'));
});

// Gulp 'assets' task
gulp.task('assets', ['sass', 'js']);

// Gulp 'webserver' task: setups the webserver and enable livereload.
gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 9000
    }));
});

// Gulp 'watch' task.
gulp.task('watch', function () {
  gulp.watch(['src/assets/**/*'], ['assets']);
  gulp.watch(['src/styleguide/**/*'], ['build']);
  gulp.watch(['src/templates/**/*'], ['build']);
});

// Gulp 'default' task.
gulp.task('default', ['assets', 'build', 'webserver', 'watch']);

// Build sections.
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

