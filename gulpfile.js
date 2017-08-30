'use strict';

const gulp      = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    cleancss    = require('gulp-clean-css'),
    assets      = require('./gulp.assets.js'),
    babel       = require('gulp-babel'),
    sourcemaps  = require("gulp-sourcemaps"),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync').create(),
    pump        = require('pump');
    var cachebust = require('gulp-cache-bust');

gulp.task('bustcache', function(){
    gulp.src('./admin/index.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./dist'));
});



/*
 * JSHint to lint all the js files
 */

gulp.task('jshint:admin',['admin.app:uglify'],  () => {
    return gulp.src(assets.adminAppList)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
gulp.task('jshint:app',['app:uglify'],  () => {
    return gulp.src(assets.userAppList)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


/*
* This task will minify all the css files
* @ admin-end
*/

gulp.task('admin-site-1:cssmin', () => {
    gulp.src(assets.adminVendorCSSListFirst)
    .pipe(concat('admin_site_1.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./assets/css/'));
});    
gulp.task('admin-site-2:cssmin', () => {
    gulp.src(assets.adminVendorCSSListTwo)
    .pipe(concat('admin_site_2.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./assets/css/'));
});    

gulp.task('admin-site:cssmin', ['admin-site-1:cssmin','admin-site-2:cssmin'],() => {});

/*
* This task will minify all the css files
* @ front-end
*/
gulp.task('site:cssmin', () => {
    gulp.src(assets.userVendorCSSList)
    .pipe(concat('site.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./assets/css/'));
});

/*
minify external Js files for  admin-end
*/
gulp.task('admin-site:uglify', (cb) => {
    pump([
        gulp.src(assets.adminVendorList),
        concat('admin-site.min.js'),
        uglify({output:{beautify: false, max_line_len:50000}}),
        gulp.dest('./assets/js')
    ],cb);
});

/*
* This task is will minify all the angular modules files
* @ front-end
*/
gulp.task('admin.app:uglify', (cb) => {
    pump([
        gulp.src(assets.adminAppList),
        sourcemaps.init(),
        babel(),
        concat('admin.app.min.js'),
        sourcemaps.write('../maps'),
        gulp.dest('./assets/js'),
        notify("Task admin.app:uglify completed!"),
        browserSync.stream()
    ],cb);
});


/*
minify external Js files for  front-end
*/
gulp.task('site:uglify', (cb) => {
    pump([
        gulp.src(assets.userVendorList),
        concat('site.min.js'),
        uglify({output:{beautify: false, max_line_len:50000}}),
        gulp.dest('./assets/js')
    ],cb);
});

/*
* This task is will minify all the angular modules files
* @ front-end
*/
gulp.task('app:uglify', (cb) => {
    pump([
        gulp.src(assets.userAppList),
        sourcemaps.init(),
        babel(),
        concat('app.min.js'),
        sourcemaps.write('../maps'),
        gulp.dest('./assets/js'),
        notify("Task app:uglify completed!"),
        browserSync.stream()
    ],cb);
});

/**
 * Production build task
 */
gulp.task('admin:build', (cb) => {
    pump([
        gulp.src(assets.adminAppList),
        sourcemaps.init(),
        babel(),
        concat('admin.app.min.js'),
        uglify(),
        sourcemaps.write('../maps'),
        gulp.dest('./assets/js')
    ],cb);
});

gulp.task('app:build', (cb) => {
    pump([
        gulp.src(assets.userAppList),
        sourcemaps.init(),
        babel(),
        concat('app.min.js'),
        uglify(),
        sourcemaps.write('../maps'),
        gulp.dest('./assets/js')
    ],cb);
});
gulp.task('build', ['admin:build','app:build'], () => {});


/**
 * Default task for gulp
 * @type {[type]}
 */
gulp.task('default', [
    'admin-site:uglify',
    'admin-site:cssmin',
    'site:cssmin',
    'admin.app:uglify',
    'site:uglify',
    'app:uglify',
    'watch'
]);

/**
 * watch:admin task will only watch and build admin files
 * Run this task only if you want to work on admin/ folder
 * @param  {Array} 'watch:admin' [array of list of watch files]
 */
gulp.task('watch:admin', () => gulp.watch(assets.adminAppList, ['jshint:admin']) );

gulp.task('browser-sync-admin', ['watch:admin'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8081
    });
});

/**
 * watch:app task will only watch and build user files
 * Run this task only if you want to work on user/ folder
 * @param  {Array} 'watch:app' [array of list of watch files]
 */
gulp.task('watch:app', () => gulp.watch(assets.userAppList, ['jshint:app']) );

gulp.task('browser-sync-app', ['watch:app'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8081
    });
});


/**
 * Default watch task will watch and build both admin and user files
 * @param  {Array} 'watch' [List of admin and user files]
 */
gulp.task('watch', () => gulp.watch(assets.adminAppList.concat(assets.userAppList), ['jshint:admin','jshint:app']) );

gulp.task('browser-sync', ['watch'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8081
    });
});