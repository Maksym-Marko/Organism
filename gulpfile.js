const gulp 		= require( 'gulp' );
const babel 	= require( 'gulp-babel' );
const concat 	= require( 'gulp-concat' );
const plumber 	= require( 'gulp-plumber' );

gulp.task( 'goBabel', () => {
	return 	gulp.src( 'js/main.js' )
			.pipe( plumber() )
			.pipe( babel({
		        presets: ['es2015']
		    }) )
			.pipe( concat( 'script.js' ) )
			.pipe( gulp.dest( 'build' ) )
} );

gulp.task( 'watch', () => {
	gulp.watch( 'js/main.js', ['goBabel'] )
} );