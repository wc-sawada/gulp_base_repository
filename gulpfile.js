//プラグイン
var gulp = require('gulp');
var sass = require('gulp-sass');
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
		.pipe(sass())
		/*
		.pipe(rename(function (path) {
			if (path.extname) {
				if (path.dirname === '.') {
					path.dirname = '';
				}
				path.basename =  path.dirname;
				path.dirname = '';
			}
		}))
		*/
		.pipe(gulp.dest('./assets/css/'));
});


// watch 監視
gulp.task('watch', function () {
	gulp.watch('./assets/scss/**/**/*.scss', ['sass-compile']);
});