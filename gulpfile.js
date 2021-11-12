const gulp         = require('gulp');
      browserSync  = require('browser-sync').create();
      sass         = require('gulp-sass')(require('sass'));
      autoprefixer = require('gulp-autoprefixer');
      notify       = require('gulp-notify');
      plumber      = require('gulp-plumber');  
      watch        = require('gulp-watch');
      pug          = require('gulp-pug');
      del          = require('del');


gulp.task('pug', function() {
	return gulp.src('app/pug/pages/**/*.pug')
		.pipe( pug({
			pretty: true
		}) )
		.pipe( gulp.dest('app') )
		.pipe( browserSync.stream() );
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
			 		title: 'Styles',
			        	sound: false,
			        	message: err.message
				}
			})
		}) )
		.pipe(sass())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});


gulp.task('watch', function() {
	gulp.watch( ['app/js/**/*.*', 'app/img/**/*.*'], gulp.parallel( browserSync.reload ) );
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('app/pug/**/*.pug', gulp.parallel('pug'));
});    

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "app"
		}
	})
});

  
gulp.task(
	'default',
	gulp.series(
	 	gulp.parallel('sass', 'pug'),
	 	gulp.parallel('server', 'watch'), 
	 	)
	);
