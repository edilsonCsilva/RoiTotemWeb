const  gulp = require("gulp")
const  plumber = require("gulp-plumber")
const  uglify = require("gulp-uglify")
const  concat = require("gulp-concat")
const  rename = require("gulp-rename")
//const minifycss = require('gulp-minify-css');




//fonte de codigo
const js_src ="./src/js/*.js"
const css_src ="./src/css/*.css"




const js_dist ="./js/"
const css_dist ="./css/"


const js_dist_name ="stillkeyboard.0.0.1.min.js"
const css_dist_name ="stillkeyboard.0.0.1.min.css"


gulp.task('scripts',function(){
    return gulp.src(js_src)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat(js_dist_name))
    .pipe(gulp.dest(js_dist));
    
})

/*
gulp.task( 'css', function() {
    gulp.src( css_src )
      .pipe( minifycss() )
      .pipe(concat(css_dist_name))
      .pipe( gulp.dest(css_dist ) );
  });
*/


 



gulp.task('watch', function() {
    gulp.watch(js_src, gulp.series('scripts'));
    //gulp.watch(js_src, gulp.series('css'));
  
  });
  