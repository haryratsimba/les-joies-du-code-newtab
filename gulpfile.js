var gulp = require('gulp'),
    babel = require('gulp-babel'),
    zip = require('gulp-zip');

/**
 * Watch ES6 JS files changes.
 */
gulp.task('watch', ['build'], function() {
    gulp.watch('newtab/scripts_es6/**.js', ['build']);
});

/**
 * Build ES6 JS files into ES5 with Babel.
 */
gulp.task('build', function() {
    return gulp.src('newtab/scripts_es6/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('newtab/scripts/'));
});

/**
 * Package the newtab in the newtab/dist/ folder.
 */
gulp.task('dist', function() {
    // Exclude es6 scripts
    return gulp.src(['newtab/**', '!newtab/scripts_es6/', '!newtab/scripts_es6/**'])
        .pipe(zip('chrome.zip'))
        .pipe(gulp.dest('dist'));
});
