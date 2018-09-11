//プラグイン
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');
/*
var rename = require ('gulp-rename');
var path = require ('path');
*/

//タスク
gulp.task('gulp-test', () =>{
	console.log('gulp success');
});

// 画像の圧縮
gulp.task('image-min', function(){
	gulp.src('./assets/watchImg/**/*') // src/imagesにある画像を読み込み
	.pipe(imagemin([pngquant({quality: '60-80', speed: 1})])) // pngの圧縮サイズを指定
	.pipe(imagemin()) // おまじないでもう一回実行
	.pipe(gulp.dest('./assets/img/')); // 吐き出し先を指定
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