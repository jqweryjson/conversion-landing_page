'use strict'

const gulp=require('gulp'),
	  sass=require('gulp-sass'),
	  autoprefixer=require('gulp-autoprefixer'),
	  browserSync=require('browser-sync').create(),
	  pngSprite = require('png-sprite'),
	  clean = require('gulp-clean'),
	  newer=require('gulp-newer');

//задачи
gulp.task('style',function(){
	return gulp.src('frontend/sass/*.*')
	.pipe(newer('frontend/css'))
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(gulp.dest('frontend/css/'))
});

//сборка проекта
gulp.task('build',gulp.series('style'));

//наблюдаем за файлами
gulp.task('watch',function(){
	gulp.watch('frontend/sass/*.*',gulp.series('style'));
	gulp.watch("frontend/*.html").on('change', browserSync.reload);
});

//make a server
gulp.task('serve',function(){
	browserSync.init({
        server: {
            baseDir: 'frontend'
        }
    });
});

browserSync.watch('frontend/css/*.*').on('change',browserSync.reload);

//make a sprite
gulp.task('sprite', function () {
  return gulp.src('frontend/img/icon/*.png')
	  .pipe(clean())
      .pipe(pngSprite.gulp({
        cssPath: 'sass/sprites2.scss',
        pngPath: 'img/sprite/sprites1.png',
        namespace: 'sprites'
      }))
      .pipe(gulp.dest('frontend'));
});

//do make dev
gulp.task('dev',
	gulp.series('build',gulp.parallel('watch','serve'))
	);
