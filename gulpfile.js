'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function () {
    return gulp.src('css/styles.scss')
        .pipe(sourcemaps.init())

        .pipe(sass(
       //     {outputStyle: 'compressed'}          // Mit dieser Zeile Wird nur das CSS komprimiert und auf eine Zeile geschrieben.Dies braucht viel weniger Platz
        ).on('error', sass.logError))

        .pipe(sourcemaps.write())
		
		.pipe(autoprefixer({					// Autoprefixer
            browsers: ['last 2 versions'],
            cascade: false
        }))
		
        .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('css/styles.scss', ['sass']);
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(["css/styles/scss", "css/Komponenten/*.scss"] ['sass']);
    gulp.watch(["*.html","css/styles/scss", "css/Komponenten/*.scss"]).on('change', browserSync.reload);
});

