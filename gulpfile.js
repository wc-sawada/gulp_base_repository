//プラグイン
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber');
/*
var rename = require ('gulp-rename');
var path = require ('path');
*/

//タスク
gulp.task('gulp-test', () =>{
	console.log('gulp success');
});

// コンパイル
gulp.task('sass-compile', () =>{
	console.log('compile start');
	return gulp.src('./assets/scss/**/**/*.scss')
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('./assets/css/'));
});


// watch 監視
gulp.task('watch', function () {
	gulp.watch('./assets/scss/**/**/*.scss', ['sass-compile']);
});