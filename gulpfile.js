var gulp             = require('gulp')
var gulp_stylus      = require('gulp-stylus')




gulp.task('stylus-browser-styles', () => {
  gulp.src('./stylus/browser.styl')
    .pipe(gulp_stylus())
    .pipe(gulp.dest('css'))
})

gulp.task('stylus-main-styles', () => {
  gulp.src('./stylus/index.styl')
    .pipe(gulp_stylus())
    .pipe(gulp.dest('css'))
})

gulp.task('stylus-new-tab-styles', () => {
  gulp.src('./stylus/new-tab/new-tab.styl')
    .pipe(gulp_stylus())
    .pipe(gulp.dest('css'))
})

gulp.task('build', ['stylus-browser-styles', 'stylus-main-styles', 'stylus-new-tab-styles'])

gulp.task('default')





if (process.argv.length == 2) {
  gulp.watch(['./stylus/**/*'], ['build'])
}
