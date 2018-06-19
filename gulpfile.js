// 以下代码会执行在node环境下。
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

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
gulp.task('style', function () {
  return gulp
    .src(['./src/styles/**/*.{scss,css}', '!./src/styles/main.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./src/styles'));
});

// 把assets目录中的所有文件拷贝到 dist目录
gulp.task('copyAssets', function () {
  return gulp.src(['./src/assets/**/*.*'], {read: true}).pipe(gulp.dest('./dist/assets/'));
});
// 创建一个gulp的任务。
gulp.task('default', ['html'], function () {
  console.log('----gulp dfualt task');
});
