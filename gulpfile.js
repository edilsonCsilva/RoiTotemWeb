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
const js_src_unique ="./src/jsunicos/"





const js_dist ="./js/"
const css_dist ="./css/"


const js_dist_name ="stillkeyboard.0.0.1.min.js"
const css_dist_name ="stillkeyboard.0.0.1.min.css"
const css_dist_name_customes ="style-custom.css"


gulp.task('scripts',function(){
    return gulp.src(js_src,{ sourcemaps: false })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat(js_dist_name))
    .pipe(gulp.dest(js_dist,{ sourcemaps: false }));
    
})

gulp.task('newRecordController',function(){
    return gulp.src("./src/jsunicos/newRecord.0.0.js",{ sourcemaps: false })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat("newRecord.0.0.min.js"))
    .pipe(gulp.dest(js_dist,{ sourcemaps: false }));
    
})

gulp.task('indexController',function(){
    return gulp.src("./src/jsunicos/index.0.0.js",{ sourcemaps: false })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat("index.0.0.min.js"))
    .pipe(gulp.dest(js_dist,{ sourcemaps: false }));
    
})

gulp.task('consultCampaingController',function(){
    return gulp.src("./src/jsunicos/consultCompaing.0.0.js",{ sourcemaps: false })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat("consultCompaing.0.0.min.js"))
    .pipe(gulp.dest(js_dist,{ sourcemaps: false }));
    
})

gulp.task('hasRegistredeController',function(){
    return gulp.src("./src/jsunicos/hasregistrer.0.0.js",{ sourcemaps: false })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat("hasregistrer.0.0.min.js"))
    .pipe(gulp.dest(js_dist,{ sourcemaps: false }));
    
})


gulp.task('printerController',function(){
    return gulp.src("./src/jsunicos/printer.0.0.js",{ sourcemaps: false })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat("printer.0.0.min.js"))
    .pipe(gulp.dest(js_dist,{ sourcemaps: false }));
    
})









gulp.task('css', function() {
   return  gulp.src( css_src,{ sourcemaps: false } )
      .pipe( minifycss() )
      .pipe(concat(css_dist_name))
      .pipe( gulp.dest(css_dist,{ sourcemaps: false } ) );


  });




  gulp.task('css_customes', function() {
    return  gulp.src("./src/cssunicos/style-custom.0.0.css",{ sourcemaps: false })
       .pipe( minifycss() )
       .pipe(concat(css_dist_name_customes))
       .pipe( gulp.dest(css_dist,{ sourcemaps: false } ) );
 
 
   });
 



 



gulp.task('auto', function() {
    gulp.watch(js_src, gulp.series('scripts'));
    gulp.watch(css_src, gulp.series('css'));
    gulp.watch("./src/cssunicos/style-custom.0.0.css", gulp.series('css_customes'));
    gulp.watch("./src/jsunicos/newRecord.0.0.js", gulp.series('newRecordController'));
    gulp.watch("./src/jsunicos/index.0.0.js", gulp.series('indexController'));
    gulp.watch("./src/jsunicos/consultCompaing.0.0.js", gulp.series('consultCampaingController'));
    gulp.watch("./src/jsunicos/hasregistrer.0.0.js", gulp.series('hasRegistredeController'));
    gulp.watch("./src/jsunicos/printer.0.0.js", gulp.series('printerController'));

    

   
    
    
  });
  