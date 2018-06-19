//引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./data/data.json')
var uglify = require('gulp-uglify');
//编译压缩sass 
gulp.task('sass', function() {
        gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(minCss())
            .pipe(gulp.dest('./src/css'))
    })
    //压缩js
gulp.task('uglify', function() {
        gulp.src('./src/js/app/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./src/minjs'))
    })
    //监听sass
gulp.task('watch', function() {
    gulp.watch('./src/scss/index.scss', ['sass'])
})

//启服务
gulp.task('server', ['sass'], function() {
    gulp.src('./src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))

})

//$
gulp.task('default', ['sass', 'watch', 'uglify', 'server'])