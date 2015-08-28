var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var react = require('gulp-react');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

function getFiles(dir){
    return fs.readdirSync(dir);
}

gulp.task('sass', function () {
    gulp.src('./sass/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('react', function(){
    gulp.src('./jsx/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('./scripts/components'));
});

gulp.task('scripts', function() {
    var dir = './scripts/app/';
    var files = getFiles(dir);
    files.forEach(function(file){
        browserify([dir + file]).bundle()
        .pipe(source(file))
        .pipe(gulp.dest('./dist/js/'));
    });
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        middleware: function (connect, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./jsx/**/*.jsx', ['react', 'scripts']);
    gulp.watch('./scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['sass', 'react', 'scripts']);
