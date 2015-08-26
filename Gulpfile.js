var gulp = require('gulp');
var react = require('gulp-react');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var fs = require('fs');

function getFiles(dir){
    return fs.readdirSync(dir);
}

gulp.task('react', function(){
    return gulp.src('./jsx/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('./scripts/components'));
});

gulp.task('sass', function () {
    return gulp.src('./sass/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
    var b = browserify({
        debug: true
    });

    return b.bundle()
        .pipe(source('./scripts/main.js'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('default', ['react', 'sass', 'scripts']);
