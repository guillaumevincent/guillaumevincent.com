var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    autoprefix = require('gulp-autoprefixer');

var paths = {
    css: [
        'bower_components/pure/pure.css',
        'bower_components/pure/grids-responsive.css',
        'css/post.css',
        'css/blog.css',
        'css/pygments.css'
    ]
};

gulp.task('css', function () {
    return gulp.src(paths.css)
        .pipe(concat('styles.min.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['css', 'watch']);

