'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();
var vueify = require('gulp-vueify');
 
gulp.task('vueify', function () {
  return gulp.src('src/components/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('./dist/components/'));
});

gulp.task('watch', function(){
    gulp.watch("src/components/**/*.vue", ["vueify"])
})

gulp.task('serve', function () {

  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch('index.js', electron.restart);

  // Reload renderer process
  gulp.watch('dist/**/*', electron.reload);
});

gulp.task('default', ['vueify', 'watch', 'serve'])