var gulp = require('gulp');
var sass = require('gulp-sass');
var jsonServer = require('json-server');

gulp.task('images', function() {
  gulp.src(['./src/images/*.*'], {base: './src/images'})
  .pipe(gulp.dest('public/images'));
});

gulp.task('css', function() {
  gulp.src('./src/css/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('public/css'));
});

gulp.task('html', function() {
  gulp.src(['./src/*.html'], {base: './src'})
  .pipe(gulp.dest('public'));
});

gulp.task('build', ['images', 'css', 'html',]);

// JSON API Server - run a REST server via a simple json file
gulp.task('serve', function(cb) {
  var apiServer = jsonServer.create();
  var router = jsonServer.router('db.json');

  apiServer.use(jsonServer.defaults());
  apiServer.use(router);
  apiServer.listen(process.env.PORT || 8000);

  cb();
});

// Watch for changes and reload stuff
gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('default', ['build', 'serve', 'watch']);
