var gulp = require ('gulp');
var sass = require ('gulp-sass');
var browserSync = require ('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require ('gulp-autoprefixer');
var browserify = require ('gulp-browserify');
var clean = require ('gulp-clean');
var concat = require ('gulp-concat');
var merge = require ('merge-stream');

var SOURCEPATHS = {
  sassSource : 'src/scss/*.scss',
  htmlSource : 'src/*.html',
  jsSource : 'src/js/*.js'
}
var APPPATH = {
  root : 'app/',
  css : 'app/css',
  js : 'app/js'
}

gulp.task('clean-html',function(){
  return gulp.src(APPPATH.root + '*.html',{
    read:false,
    force:true
  }).pipe(clean());
});

gulp.task('clean-scripts',function(){
  return gulp.src(APPPATH.js + '/*.js',{
    read:false,
    force:true
  }).pipe(clean());
});

gulp.task('sass',function(){
  var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
  var sassFiles;
  sassFiles = gulp.src(SOURCEPATHS.sassSource)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
      return merge(bootstrapCSS,sassFiles)
      .pipe(concat('app.css'))
      .pipe(gulp.dest(APPPATH.css));
});

gulp.task('scripts',function(){
  return gulp.src(SOURCEPATHS.jsSource)
    .pipe(concat('main.js'))
    .pipe(browserify())
    .pipe(gulp.dest(APPPATH.js));
});

gulp.task('copy',function(){
  gulp.src(SOURCEPATHS.htmlSource)
    .pipe(gulp.dest(APPPATH.root));
});
gulp.task('copy-scripts',function(){
  gulp.src(SOURCEPATHS.jsSource)
    .pipe(gulp.dest(APPPATH.js));
});

gulp.task('serve',['sass'],function(){
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '*.html', APPPATH.js + '/*.js'],{
    server : {
      baseDir : APPPATH.root
    }
  })
});

gulp.task('watch',['serve','copy','clean-html','scripts','clean-scripts'],function(){
  gulp.watch([SOURCEPATHS.sassSource],['sass']);
  gulp.watch([SOURCEPATHS.htmlSource],['copy','clean-html']);
  gulp.watch([SOURCEPATHS.jsSource],['scripts','clean-scripts']);
});

gulp.task('default',['watch']);
