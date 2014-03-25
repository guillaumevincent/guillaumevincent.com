var gulp = require('gulp');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var flatten = require('gulp-flatten');
var less = require('gulp-less');
var clean = require('gulp-clean');
var sass = require('gulp-sass')
var rename = require("gulp-rename");
var uncss = require('gulp-uncss');
var inlinecss = require('gulp-inline-css');
var minifyHTML = require('gulp-minify-html');
var autoprefix = require('gulp-autoprefixer');

//npm install --save-dev gulp-autoprefixer gulp-rename gulp-concat gulp-minify-css gulp-uglify gulp-clean gulp-flatten gulp-gzip gulp-ngmin gulp-less gulp-uncss gulp-htmlmin gulp-sass gulp-inline-css

var paths = {
    clean: [
        'static/*/*.min.*',
        'static/css/*'
    ],
    css_vendor: [
        'bower_components/bootstrap/dist/css/bootstrap.css'
    ],
    fonts_vendor: [
        'bower_components/bootstrap/dist/fonts/*'
    ],
    js_vendor: [
        'bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    sass: [
        'static/sass/htmlstart.scss'
    ],
    html: [
        'templates/*'
    ],
    css: [
        'static/css/*.css'
    ]





//    less: 'public/less/bootstrap/bootstrap.less',
//    css: ['public/css/*.css', 'public/css/vendor/*.css'],
//    fonts: ['bower_components/**/*.otf', 'bower_components/**/*.eot', 'bower_components/**/*.ttf', 'bower_components/**/*.svg', 'bower_components/**/*.woff']
    /*
     vendor: [
     'js/vendor/jquery.min.js',
     'js/vendor/angular.min.js',
     'js/vendor/bootstrap.min.js',
     'js/vendor/moment-with-langs.min',
     'js/vendor/underscore.js' ],
     scripts: ['js*//*.js', '!js/vendor'],
     images: 'public/img*//*',*/
};

/*

 gulp.task('less', function () {
 return gulp.src(paths.less)
 .pipe(less())
 .pipe(concat('bootstrap.css'))
 .pipe(gulp.dest('public/css/vendor'));
 });

 gulp.task('fonts', function () {
 return gulp.src(paths.fonts)
 .pipe(flatten())
 .pipe(gulp.dest('public/fonts'));
 });

 gulp.task('clean', function () {
 return gulp.src('public/css*/
/*.min.css', {read: false})
 .pipe(clean());
 });
 */

/*
 gulp.task('css', function () {
 gulp.src(paths.css)
 .pipe(concat(application_name + '.min.css'))
 .pipe(minifycss())
 .pipe(gulp.dest('public/css'));
 });
 */

// Minify and copy all JavaScript (except vendor scripts)
/*
 gulp.task('js', function () {
 return gulp.src(paths.scripts)
 .pipe(uglify({mangle: false}))
 .pipe(concat('htmlstart.min.js'))
 .pipe(gulp.dest('public/js'));
 });


 gulp.task('less', function () {
 return gulp.src(paths.less)
 .pipe(less())
 .pipe(concat('vendor.css'))
 .pipe(gulp.dest('dist/build'))
 .pipe(refresh(server))
 })

 // Minify and gzip vendor scripts
 gulp.task('vendor', ['fonts'], function () {
 return gulp.src(paths.vendor)
 .pipe(uglify({mangle: false}))
 .pipe(concat('vendor.min.js'))
 .pipe(gulp.dest('public/js'));
 });


 gulp.task('img', function () {
 return gulp.src(paths.images)
 .pipe(imagemin({optimizationLevel: 5}))
 .pipe(gulp.dest('public/img'));
 });
 */


/*

 gulp.task('vendor', ['clean'], function () {
 gulp.src(paths.css_vendor)
 .pipe(concat('vendor.min.css'))
 .pipe(minifycss())
 .pipe(uncss({
 html: paths.html
 }))
 .pipe(gulp.dest('static/css'));

 gulp.src(paths.fonts_vendor)
 .pipe(gulp.dest('static/fonts'));

 gulp.src(paths.js_vendor)
 .pipe(uglify({mangle: false}))
 .pipe(concat('vendor.min.js'))
 .pipe(gulp.dest('static/js'));
 });
 */


gulp.task('minify-html', function () {
    var opts = {comments: false, spare: true};

    gulp.src('./*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./build/'))
});


// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.css, ['css']);
//    gulp.watch(paths.scripts, ['js']);
//    gulp.watch(paths.images, ['img']);
});


gulp.task('clean', function () {
    gulp.src(paths.clean, {read: false})
        .pipe(clean());
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(flatten())
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('css', ['clean'], function (callback) {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('static/css'));

    gulp.src(paths.css_vendor)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('static/css'));

    gulp.src(paths.css)
        .pipe(concat('style.min.css'))
        .pipe(uncss({
            html: paths.html
        }))
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(gulp.dest('static/css'));
});


gulp.task('clean', function () {
    var clean_paths = [
        'static/css',
        'static/js/vendor',
        'static/fonts'
    ];
    gulp.src(clean_paths, {read: false})
        .pipe(clean());
});

gulp.task('get_vendor_static_files', ['clean'], function () {
    gulp.src('bower_components/**/*.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('static/js/vendor'));

    gulp.src('bower_components/**/*.min.css')
        .pipe(flatten())
        .pipe(gulp.dest('static/css/vendor/'));

    gulp.src('bower_components/**/fonts/*')
        .pipe(flatten())
        .pipe(gulp.dest('static/fonts/'));
});

gulp.task('css', function () {
    gulp.src('static/css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(gulp.dest('static/css'));
});

gulp.task('uncss', function () {
    gulp.src('static/css/style.min.css')
        .pipe(uncss({
            html: 'templates/index.html'
        }))
        .pipe(gulp.dest('build/css'));
});


// watch files for changes
gulp.task('watch', function() {
    gulp.watch('static/scss/*.scss', ['sass']);
    gulp.watch('static/css/*.css', ['css']);
});

// compile sass files
gulp.task('sass', function() {
    return gulp.src('static/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('static/css'));
});

// the default task (called when you run `gulp` from cli)
gulp.task('default', ['css', 'sass', 'watch']);

