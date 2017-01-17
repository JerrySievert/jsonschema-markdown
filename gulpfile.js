var gulp = require('gulp');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');

var pack = require('./package.json');


gulp.task('jshint', function () {
  gulp.src([
    'lib/parser.js',
    'lib/generator.js'
  ])
  .pipe(jshint({
      lookup: true
    }))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('test', shell.task([
  './node_modules/.bin/istanbul cover ./node_modules/.bin/tape test/*.js'
]));

gulp.task('default', [ 'test', 'jshint' ]);
