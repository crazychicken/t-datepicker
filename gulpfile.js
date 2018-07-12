var gulp = require('gulp');
var sass = require('gulp-sass');

var gulp_concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');
var cssmin = require('gulp-cssmin');

var gulp_file_include = require('gulp-file-include');
var browser_sync = require('browser-sync').create();

// SYNC HTML
gulp.task('include-html', function(){
    gulp.src([
        './html/*.html'
    ])
    .pipe(gulp_file_include())
    // .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./public'))
    .pipe(browser_sync.stream());
});

gulp.task( 'sass' , function() {
    // copy old file no min
    gulp.src([
        './sass/*.scss',
    ])
    .pipe(sass())
    .pipe(gulp_concat('t-datepicker.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/theme/css'))

    gulp.src([
        './sass/**/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('./public/theme/css'))
    .pipe(browser_sync.stream());
})

gulp.task( 'min-css' , function() {
    // Min new name file and keep old file
    gulp.src([
        './sass/**/*.scss',
        '!./sass/*.scss',
        '!./sass/themes/t-datepicker-main.scss'
    ])
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./public/theme/css'))
    .pipe(browser_sync.stream());
})

// SYNC js
gulp.task('js', function(){
    gulp.src([
        './theme/js/*.js'
    ])
    .pipe(gulp.dest('./public/theme/js'))

    gulp.src([
        './theme/js/*.js'
    ])
    .pipe(gulp_concat('t-datepicker.min.js'))
    .pipe(jsmin())
    .pipe(gulp.dest('./public/theme/js'))
    .pipe(browser_sync.stream());
});

// COPY js
gulp.task('js-copy', function(){
    gulp.src([
        './node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js'
    ])
    .pipe(gulp.dest('./public/theme/libs/'))
});
// COPY Css
gulp.task('css-copy', function(){
    gulp.src([
        './node_modules/perfect-scrollbar/css/perfect-scrollbar.css',
        './node_modules/converthtml/sass/convert-theme-default.scss'
    ])
    .pipe(gulp_concat('_libs.scss'))
    .pipe(gulp.dest('./sass/layout'))
});
// COPY Images
gulp.task('images-copy', function(){
    gulp.src([
        './theme/images/*.png',
        './theme/images/*.jpg',
        './theme/images/*.svg',
        './theme/images/*.gif',
    ])
    .pipe(gulp.dest('./public/theme/images'))
});


gulp.task("Sync", ['include-html', 'sass', 'js', 'min-css'], function(){
    browser_sync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch(['./html/**/*.html'], ['include-html']);
    gulp.watch(['./sass/**/*.scss'], ['sass']);
    gulp.watch(['./sass/**/*.scss'], ['min-css']);

    gulp.watch(['./theme/js/*.js'], ['js']);
})

gulp.task('default', ['Sync', 'js-copy', 'css-copy', 'images-copy']);
