var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer');

var paths = {
    scss: [
        '../css/styles.scss'
    ]
};

gulp.task('scss', function () {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(gulp.dest('../css'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scss, ['scss']);
});

gulp.task('default', ['scss', 'watch']);

