const gulp = require('gulp'),
	  sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync'),
      cssnano = require('gulp-cssnano'),
	  minifyHTML = require('gulp-htmlmin'),
      del = require('del')

gulp.task('styles', function(){
  	return gulp.src('src/styles.scss')
	    .pipe(sass({outputStyle: 'compressed'}))
	    .pipe(autoprefixer())
	    .pipe(cssnano())
	    .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.reload({
			stream: true
		}));
})

gulp.task('scripts', function(){
	return gulp.src('src/scripts.js')
		.pipe(gulp.dest('docs/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
})

gulp.task('html', function() {
  	return gulp.src('src/index.html')
	    .pipe(minifyHTML({collapseWhitespace: true}))
	    .pipe(gulp.dest('docs'));
})

gulp.task('clean', function(){
	return del(['docs/js', 'docs/css']);
})

gulp.task('serve', ['clean'], function(){
	gulp.start('styles', 'scripts', 'html');
	browserSync.init({
		server: 'docs'
	});
	gulp.watch('src/styles.scss', ['styles']);
	gulp.watch('src/scripts.js', ['scripts']);
	gulp.watch('src/index.html', ['html']);
	gulp.watch('docs/*.html', browserSync.reload);
});

gulp.task('default', ['serve']);