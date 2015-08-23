"use strict";

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyJs = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

var paths = {
    build: "static/",
    js: [],
    js_vendors: [],
    html: [],
    styles: [
        'assets/styles/**/*.scss'
    ],
    styles_vendors: [],
    images: ['assets/images/**/*'],
    fonts: []
};

gulp.task('clean', function (callback) {
    del(paths.build, {force: true}, callback);
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.build + '/fonts'));
});

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(concat('app.min.js'))
        .pipe(minifyJs())
        .pipe(gulp.dest(paths.build + 'js/'));
});


gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.build + '/images'));
});


gulp.task('js_vendors', function () {
    return gulp.src(paths.js_vendors)
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest(paths.build + 'js/'));
});


gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(minifyHtml({empty: true}))
        .pipe(gulp.dest(paths.build + 'html/'));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest(paths.build + '/styles'));
});

gulp.task('styles_vendors', function () {
    return gulp.src(paths.styles_vendors)
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest(paths.build + 'styles/'));
});

gulp.task('build', ['clean'], function () {
    gulp.start('js', 'js_vendors', 'html', 'styles', 'styles_vendors', 'images', 'fonts');
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.js_vendors, ['js_vendors']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.styles_vendors, ['styles_vendors']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.images, ['fonts']);
});


gulp.task('default', ['watch'], function () {

});