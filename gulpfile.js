// 以下代码会执行在node环境下。
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const sourcemap = require('gulp-sourcemaps');
const rev = require('gulp-rev');

// 参数： 第一个参数是任务的名字 第二个参数： 可以省略，依赖的任务名。数组类型，里面是字符串。 第三个参数： 回调函数，接受参数，任务执行完之后可调用
// 回调函数： 返回值要么是  stream、promise、调用cb
gulp.task('html', function () {
  console.log('html 压缩！')
});

/*
* 1. scss文件进行编译 css文件
* 2. css文件和scss编译后的代码合并到main.css文件中去。
* 3. css自动添加前缀css3
* 4. css进行压缩
* 5. 如果是开发阶段，需要增加sourcemap
* 6. 给最后的main.css文件添加版本号。
*/
gulp.task('style:dev', function () {
  return gulp
    .src(['./src/styles/**/*.{css,scss}', '!./src/styles/main.css'])
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError)) // 对请求的流中的scss代码进行编译成css代码
    .pipe(autoprefixer({
      // 兼容css3
      browsers: ['last 2 versions'], // 浏览器版本
      cascade: true, // 美化属性，默认true
      add: true, // 是否添加前缀，默认true
      remove: true, // 删除过时前缀，默认true
      flexbox: true // 为flexbox属性添加前缀，默认true
    }))
    .pipe(concat('main.css')) // css 文件合并
    .pipe(sourcemap.write())
    .pipe(gulp.dest('./src/styles'));
});

// 最终部署产品用的。
gulp.task('style', function () {
  return gulp
    .src(['./src/styles/**/*.{css,scss}', '!./src/styles/main.css'])
    .pipe(sass().on('error', sass.logError)) // 对请求的流中的scss代码进行编译成css代码
    .pipe(autoprefixer({
      // 兼容css3
      browsers: ['last 2 versions'], // 浏览器版本
      cascade: true, // 美化属性，默认true
      add: true, // 是否添加前缀，默认true
      remove: true, // 删除过时前缀，默认true
      flexbox: true // 为flexbox属性添加前缀，默认true
    }))
    .pipe(concat('main.css')) // css 文件合并
    .pipe(cleanCss({
      // 压缩css
      compatibility: 'ie8',
      // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(rev())
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('src/styles'));
});

// 把assets目录中的所有文件拷贝到 dist目录
gulp.task('copyAssets', function () {
  return gulp.src(['./src/assets/**/*.*'], {read: true}).pipe(gulp.dest('./dist/assets/'));
});

// 创建一个gulp的任务。
gulp.task('default', ['html'], function () {
  console.log('----gulp dfualt task');
});

gulp.task('dev', function () {
  // 监控scss或者css变化，并自动调用style样式生成工作流 监控的路径不要写 ./ 不然不能监控到 添加文件的变化。
  gulp.watch([
    'src/styles/css/**', 'src/styles/scss/**'
  ], ['style:dev']);
});