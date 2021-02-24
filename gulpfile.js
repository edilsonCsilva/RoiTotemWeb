const  gulp = require("gulp")
const  plumber = require("gulp-plumber")
const  uglify = require("gulp-uglify")
const  concat = require("gulp-concat")
const  rename = require("gulp-rename")
const minifycss = require('gulp-minify-css');




//fonte de codigo
const js_src ="./src/js/*.js"
const css_src ="./src/css/*.css"
const css_src_unique ="./src/cssinicos/"




const js_dist ="./js/"
const css_dist ="./css/"


const js_dist_name ="stillkeyboard.0.0.1.min.js"
const css_dist_name ="stillkeyboard.0.0.1.min.css"
const css_dist_name_customes ="style-custom.css"


gulp.task('scripts',function(){
    return gulp.src(js_src,{ sourcemaps: true })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat(js_dist_name))
    .pipe(gulp.dest(js_dist,{ sourcemaps: true }));
    
})


gulp.task('css', function() {
   return  gulp.src( css_src,{ sourcemaps: true } )
      .pipe( minifycss() )
      .pipe(concat(css_dist_name))
      .pipe( gulp.dest(css_dist,{ sourcemaps: true } ) );


  });




  gulp.task('css_customes', function() {
    return  gulp.src("./src/cssunicos/style-custom.0.0.css",{ sourcemaps: true })
       .pipe( minifycss() )
       .pipe(concat(css_dist_name_customes))
       .pipe( gulp.dest(css_dist,{ sourcemaps: true } ) );
 
 
   });
 



 



gulp.task('auto', function() {
    gulp.watch(js_src, gulp.series('scripts'));
    gulp.watch(css_src, gulp.series('css'));
    gulp.watch("./src/cssunicos/style-custom.0.0.css", gulp.series('css_customes'));
    
    
  });
  