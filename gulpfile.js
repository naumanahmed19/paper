//Gulp Packages =============================================
//var fs = require('fs');
var fs = require('fs-extra');
var app = JSON.parse(fs.readFileSync('./package.json'));
var ftp = JSON.parse(fs.readFileSync('./ftp.config'));

var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    uglifycss = require('gulp-uglifycss'),
    minifyInline = require('gulp-minify-inline'),
    imagemin = require('gulp-imagemin'),
    injectPartials = require('gulp-inject-partials'),
    htmlclean = require('gulp-htmlclean'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gm = require('gulp-gm'),
    del = require('del'),
    zip = require('gulp-zip'),
    gutil = require('gulp-util'),
    vinylFtp = require('vinyl-ftp');


var tf = {
    zipSrc: 'tf/',
    zipDist: 'tf-upload/',
    root: 'tf/' + app.slug + '/',
    app: 'tf/' + app.slug + '/app/'
};

var paths = {
    src: 'app/src/**/*',
    srcHTML: 'app/src/*.html',
    srcCSS: 'app/src/assets/scss/app.scss',
    srcJS: 'app/src/assets/js/app.js',
    srcPhp: 'app/src/assets/php/**/*',
    srcImages: 'app/src/assets/img/**/*',
    srcVideos: 'app/src/assets/videos/**/*',
    srcFonts: 'app/src/assets/fonts/**/*',


    tmp: 'app/tmp',
    tmpIndex: 'app/tmp/index.html',
    tmpHTML: 'app/tmp/**/*.html',
    tmpCSS: 'app/tmp/assets/css',
    tmpJS: 'app/tmp/assets/js',
    tmpPhp: 'app/tmp/assets/php',
    tmpImages: 'app/tmp/assets/img',
    tmpVideos: 'app/tmp/assets/videos',
    tmpFonts: 'app/tmp/assets/fonts/',

    dist: 'app/dist',
    distIndex: 'app/dist/index.html',
    distCSS: 'app/dist/assets/css/',
    distJS: 'app/dist/assets/js/',
    distPhp: 'app/dist/assets/php',
    distImages: 'app/dist/assets/img',
    distVideos: 'app/dist/assets/videos',
    distFonts: 'app/dist/assets/fonts'


};

var bases = {
    app: 'app/src/',
    tmp: 'app/tmp/',
    dist: 'app/dist/',
    demoFolder: app.slug + '-' + app.version + '/'


};

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};


// html task =============================================
gulp.task('test', function () {
    console.log(ftp.server.host);
});


// html task =============================================
gulp.task('views', function () {
    return gulp.src(paths.srcHTML)
        .pipe(injectPartials({
            removeTags: true
        }))
        .pipe(gulp.dest(paths.tmp));
});


gulp.task('views-rebuild', gulp.series('views', function (done) {
    browserSync.reload();
    done();
}));

gulp.task('scripts', function () {
    return gulp.src(paths.srcJS)

        .pipe(webpack({
            output: {
                    filename: 'app.js'
                }
            }
        ))
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest(paths.tmpJS));
});
gulp.task('styles', function () {
    return gulp.src(paths.srcCSS)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest((paths.tmpCSS)))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('images', function () {
    return gulp.src(paths.srcImages)
        .pipe(gulp.dest(paths.tmpImages));
});
gulp.task('fonts', function () {
    return gulp.src(paths.srcFonts)
        .pipe(gulp.dest(paths.tmpFonts));
});
gulp.task('php', function () {
    return gulp.src(paths.srcPhp)
        .pipe(gulp.dest(paths.tmpPhp));
});
gulp.task('videos', function () {
    return gulp.src(paths.srcVideos)
        .pipe(gulp.dest(paths.tmpVideos));
});

gulp.task('clean:tmp', function () {
    return del(bases.tmp + '**', {force: true});
});

/*---------------------------------------
 Command: gulp
 Description:  build dev version...
 ---------------------------------------- */
gulp.task('default', gulp.series(
    'clean:tmp',
    'styles',
    'scripts',
    'views',
    'images',
    'fonts',
    'php',
    'videos'
));


// Rerun the task when a file changes
gulp.task('watch', gulp.series('default', function () {
    browserSync.init({
        server: {
            baseDir: bases.tmp
        }
    });
    gulp.watch('app/src/assets/img/**/*.*', gulp.series('images'));
    // gulp.watch('app/src/assets/fonts/**/*',gulp.series('copy'));
    gulp.watch('app/src/assets/php/**/*', gulp.series('php'));
    gulp.watch('app/src/assets/scss/**/*', gulp.series('styles'));
    gulp.watch('app/src/assets/js/**/*', gulp.series('scripts'));
    gulp.watch('app/src/*/*', gulp.series('views-rebuild'));

    gulp.watch('app/src/*.html').on('change', function (file) {
        return gulp.src(file)
            .pipe(injectPartials({
                removeTags: true,
                ignoreError: true
            }))
            .pipe(gulp.dest(paths.tmp))
            .pipe(browserSync.reload({stream: true}));
    });


}));


/*-----------TASKS TO CREATE PRODUCTION VERSION---------- */



/*---------------------------------------
 Command: gulp html:dist
 Description:  Inject partials then copy to dist
 ---------------------------------------- */
gulp.task('html:dist', gulp.series('views', function () {
    return gulp.src(paths.tmpHTML)
        .pipe(gulp.dest(paths.dist));
}));
gulp.task('html:dist-min', gulp.series('views', function () {
    return gulp.src(paths.tmpHTML)
        .pipe(minifyInline())
        .pipe(htmlclean())
        .pipe(gulp.dest(paths.dist));
}));


/*---------------------------------------
 Command: gulp css:dist
 Description: Compiles sass which will create app.css in tmp then copy from temp to dist
 ---------------------------------------- */

gulp.task('css:dist', gulp.series('styles', function () {
    return gulp.src(paths.srcCSS)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest(paths.distCSS));
}));
gulp.task('css:dist-min', gulp.series('styles', function () {
    return gulp.src(paths.srcCSS)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.distCSS));
}));

/*---------------------------------------
 Command: gulp js:dist
 Description: copy js from tmp to dist and compress it
 ---------------------------------------- */

gulp.task('js:dist', gulp.series('scripts', function () {
    return gulp.src(paths.tmpJS + '/**/*')
        .pipe(gulp.dest(paths.distJS));
}));

gulp.task('js:dist-min', gulp.series('scripts', function () {
    return gulp.src(paths.tmpJS + '/**/*')
        .pipe(uglify())
        .pipe(gulp.dest(paths.distJS));
}));
/*---------------------------------------
 Command: gulp php:dist
 Description: copy php to dist
 ---------------------------------------- */

gulp.task('php:dist', gulp.series('php', function () {
    return gulp.src(paths.tmpPhp + '/**/*')
        .pipe(gulp.dest(paths.distPhp));
}));
gulp.task('videos:dist', gulp.series('videos', function () {
    return gulp.src(paths.tmpVideos + '/**/*')
        .pipe(gulp.dest(paths.distVideos));
}));
/*---------------------------------------
 Command: gulp fonts:dist
 Description: copy fonts to dist
 ---------------------------------------- */

gulp.task('fonts:dist', gulp.series('fonts', function () {
    return gulp.src(paths.tmpFonts + '/**/*')
        .pipe(gulp.dest(paths.distFonts));
}));

/*---------------------------------------
 Command: gulp img-compress
 Description: compress images : will only compress images in demo folder
 do not add any other file except png,jpg,jpeg
 ---------------------------------------- */

gulp.task('img-compress', gulp.series('images', function () {
    return gulp.src(paths.distImages + '/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.distImages));
}));

gulp.task('previews-resize', function () {
    return gulp.src('app/src/assets/img/previews/**/*')
        .pipe(gm(function (gmfile) {
            return gmfile.resize(470);
        }, {
            imageMagick: true
        }))
        .pipe(gulp.dest(paths.distImages + '/previews'));
});

/*---------------------------------------
 Command: gulp images:dist
 Description: copy images to destination
 ---------------------------------------- */

gulp.task('images:dist', gulp.series('images', function () {
    return gulp.src(paths.srcImages)
        .pipe(gulp.dest(paths.distImages))
}));

/*---------------------------------------
 Command: gulp placeholder
 Description: Will change images to blur placeholders in dist/assets/img/demo
 ---------------------------------------- */

gulp.task('placeholder', gulp.series(['images'], function () {
    return gulp.src(paths.distImages + '/demo/**/*')
        .pipe(gm(function (gmfile) {
            return gmfile.blur(100, 100);
        }, {
            imageMagick: true
        }))
        .pipe(gulp.dest(paths.distImages + '/demo/'));

}));


/*---------------------------------------
 Command: gulp copy:dist
 Description: Copy to destination folder
 ---------------------------------------- */
gulp.task('clean:dist', function () {

    return del(bases.dist + '**/*', {force: true});

});


/*---------------------------------------
 Command: gulp production
 Description: Create production version
 ---------------------------------------- */







/*---------------------------------------
 Command: gulp deploy
 Description: Create final minified version & upload to server
 -
 ---------------------------------------- */

gulp.task('clean:demo-folder', function () {
    return del(bases.demoFolder + '**', {force: true});
});
gulp.task('make-demo', gulp.series(['clean:demo-folder'], function () {
    return gulp.src(bases.dist + '**')
        .pipe(gulp.dest(bases.demoFolder));
}));


gulp.task('production', gulp.series(
    'clean:dist',
    'html:dist',
    'css:dist',
    'js:dist',
    'fonts:dist',
    'php:dist',
    'images:dist',
    'videos:dist'
));

gulp.task('production-min', gulp.series(
    'clean:dist',
    'html:dist-min',
    'css:dist-min',
    'js:dist-min',
    'fonts:dist',
    'php:dist',
    'images:dist',
    'videos:dist'
));

gulp.task('demo', gulp.series(
    'production-min',
    'previews-resize',
    'img-compress',
    'make-demo'
));

/*---------------------------------------
 Command: gulp tf
 Description: Create final tf version & upload to server on for envato authors.
 -
 ---------------------------------------- */
gulp.task('clean:tf', function () {
    return del(tf.zipSrc + '**', {force: true});
});

gulp.task('clean:tf-zip', function () {
    return del(tf.zipDist + '**', {force: true});
});

gulp.task('tf-zip', gulp.series(['clean:tf-zip'], function () {
    return gulp.src(tf.zipSrc + '**')
        .pipe(zip(app.slug + '-' + app.version + '-all-files.zip'))
        .pipe(gulp.dest(tf.zipDist))
}));


var $conent = '{\r\n  \"server\": {\r\n    \"host\": \"ENTER YOUR HOST NAME\",\r\n    \"user\": \"ENTER YOUR USER NAME\",\r\n    \"pass\": \"ENTER YOUR PASSWORD\",\r\n    \"port\": \"21\",\r\n    \"path\": \"\/public_html\/\"\r\n  }\r\n}\r\n';

var $documentation = 'Kindly check documentations.html in app\/dist folder for help.\r\n\r\n\r\nFor online docs visit\r\n\r\nhttp:\/\/xvelopers.com\/html\/paper\/documentations.html';


gulp.task('tf-upload', function () {
    var conn = vinylFtp.create({
        host: ftp.tf.host,
        user: ftp.tf.user,
        password: ftp.tf.pass,
        parallel: 3,
        log: gutil.log
    });
    var globs = [
        'tf-upload/' + '**'
    ];
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
    return gulp.src(globs, {buffer: false})
        .pipe(conn.newer(ftp.tf.path)) // only upload newer files
        .pipe(conn.dest(ftp.tf.path));
});
function cb (err,data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
}

gulp.task('tf-version', gulp.series(['clean:tf', 'production', 'placeholder', 'previews-resize', 'img-compress'], function () {
    gulp.src('gulpfile.js')
        .pipe(gulp.dest(tf.root));

    gulp.src('package.json')
        .pipe(gulp.dest(tf.root));

    fs.outputFile(tf.root + 'ftp.config', $conent, cb);

    fs.outputFile(tf.zipSrc + 'Documentation/help.txt', $documentation, cb);

    gulp.src(bases.app + '**')
        .pipe(gulp.dest(tf.app + 'src'));

    gulp.src(bases.dist + '**')
        .pipe(gulp.dest(tf.app + 'dist'));

    //Replace compress and placeholder images from dist to src folder
    del(tf.app + 'src/assets/img/**/*', {force: true});

    return gulp.src(tf.app + 'dist/assets/img/**/*')
        .pipe(gulp.dest(tf.app + 'src/assets/img/**/*'));

}));

gulp.task('tf', gulp.series(
    'tf-version',
    'tf-zip',
    'tf-upload',
    'clean:tf',
    'clean:tf-zip'
));

// CREATE DEMO VERSION

gulp.task('upload', function () {
    var conn = vinylFtp.create({
        host: ftp.server.host,
        user: ftp.server.user,
        password: ftp.server.pass,
        parallel: 3,
        log: gutil.log
    });
    var globs = [
        bases.demoFolder + '**'
    ];
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
    return gulp.src(globs, {base: '.', buffer: false})
        .pipe(conn.newer(ftp.server.path)) // only upload newer files
        .pipe(conn.dest(ftp.server.path));
});


gulp.task('deploy', gulp.series(
    'default',
    'demo',
    'upload',
    'clean:demo-folder'
));