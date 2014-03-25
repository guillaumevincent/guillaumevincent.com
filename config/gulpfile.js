var gulp = require('gulp');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uncss = require('gulp-uncss');
var autoprefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

var paths = {
    html: [
        '../_site/index.html',
        '../_site/2014/02/20/Labels-dans-gmail.html',
        '../_site/2013/11/15/Merci.html',
        '../_site/2013/10/27/Start-faster-gives-the-impression-to-go-faster.html',
        '../_site/2013/09/15/First-10-minutes-on-ubuntu-servers.html',
        '../_site/2013/08/15/oh-putain-Bob-tu-menerves.html',
        '../_site/2013/02/12/Basic-authentication-on-Tornado-with-a-decorator.html',
        '../_site/2013/02/01/Better-social-widget-lazy-loading.html',
        '../_site/2013/01/03/Git-pour-les-nuls-annuler_les_x_derniers_commit.html',
        '../_site/2012/12/23/Git-pour-les-nuls-recuperer_une_branche_distante.html',
        '../_site/2012/09/20/Comment-your-damn-code-bitch.html',
        '../_site/2012/03/13/La-simplicite-grace-a-Tdd.html',
        '../_site/2012/03/02/blogofile-ovh-et-amazon.html',
        '../_site/2012/01/24/Copier-le-contenu-dune-liste-en-python.html',
        '../_site/2011/11/12/Citation-de-clean-code.html',
        '../_site/2011/11/11/La-contractualisation-agile-dans-une-SSII.html',
        '../_site/2011/10/11/Lagilite-en-solitaire-c-est-difficile-le-retour.html',
        '../_site/2011/04/20/Coder-en-francais-ou-coder-en-anglais.html',
        '../_site/2011/03/22/Un-projet-logiciel-en-image.html',
        '../_site/2011/03/09/Semaphore-du-flux-de-productivite.html',
        '../_site/2011/02/16/Le-Coding-Dojo.html',
        '../_site/2011/02/03/L-agilite-en-solitaire-c-est-difficile.html',
        '../_site/2010/12/16/Le-double-planning-poker.html',
        '../_site/2010/11/17/La-retrospective-son-principal-interet.html',
        '../_site/2010/10/23/Test-Driven-Development-TDD.html'
    ],
    css: [
        '../static/lib/bootstrap/dist/css/bootstrap.css',
        '../static/css/*.css'
    ],
    uncss: [
        '../public/css/guillaumevincent.min.css'
    ],
    images: [
        '../static/img/*'
    ]

};

gulp.task('css', function () {
    gulp.src(paths.css)
        .pipe(concat('guillaumevincent.min.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(gulp.dest('../public/css'));
});

gulp.task('images', function() {
 return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('../public/img'));
});

// watch files for changes
gulp.task('watch', function () {
    gulp.watch(paths.css, ['css']);
});

gulp.task('uncss', function () {
    gulp.src('../public/css/guillaumevincent.min.css')
        .pipe(uncss({
            html: paths.html
        }))
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(gulp.dest('../public/css'));
});

// the default task (called when you run `gulp` from cli)
gulp.task('default', ['css', 'images', 'watch']);

