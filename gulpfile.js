const config = require('./gulp.config.js')();
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugs = gulpLoadPlugins();
const env = process.env.NODE_ENV || 'local';
const eventStream = require('event-stream');
const merge = require('merge-stream');


var optimize = false;


if (env === 'staging' || env === 'production')
{

    optimize = true;
}

gulp.task('jade2html', () =>
{

    return gulp
        .src(`${config.appFolder }**/*.jade`)
        .pipe(plugs.jade())
        .pipe(plugs.htmlmin())
        .pipe(gulp.dest(config.appFolder));
});

gulp.task('almundo-hotels-styles', () =>
{

    return gulp
        .src(config.mainscss)
        .pipe(plugs.sass())
        .pipe(plugs.rename(`${config.projectName}.css`))
        .pipe(plugs.if(optimize, plugs.combineMq()))
        .pipe(plugs.if(optimize, plugs.csso()))
        .pipe(plugs.if(optimize, plugs.rev()))
        .pipe(gulp.dest(config.build));
});


gulp.task('scripts-vendor', () =>
{
    const mainBowerFiles = require('main-bower-files');
return gulp
    .src(mainBowerFiles('**/*.js'))
    //.pipe(plugs.debug())
    .pipe(plugs.concat(`${config.projectName }-lib.js`))
    .pipe(plugs.if(optimize, plugs.uglify()))
    .pipe(plugs.if(optimize, plugs.stripDebug()))
    .pipe(plugs.if(optimize, plugs.rename({extname: '.min.js'})))
    .pipe(gulp.dest(config.build));
});

gulp.task('almundo-hotels-scripts', ['jade2html'], () =>
{


    var scriptsStream = gulp.src(config.appFolder + '**/*.js'),
    templateCacheStream = gulp.src(config.appFolder + '**/*.html')
        .pipe(plugs.angularTemplatecache(config.templateCache.file, config.templateCache.options));
        console.log(plugs.order(config.jsOrder));

return eventStream.merge(templateCacheStream, scriptsStream)
    .pipe(plugs.order(config.jsOrder))
    .pipe(plugs.concat(`${config.projectName}.js`))
    .pipe(plugs.if(optimize, plugs.uglify()))
    //.pipe(plugs.if(optimize, plugs.stripDebug()))
    //.pipe(plugs.if(optimize, plugs.rename({extname: '.min.js'})))
    .pipe(gulp.dest(config.build));

});


gulp.task('fonts', function ()
{
    return  gulp.src('./code/frontend/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(config.build));

});


gulp.task('img', function ()
{
    return  gulp.src('./code/frontend/img/**/*.{jpg,png,svg,ico}')
        .pipe(gulp.dest(config.build + '/img'));

});


gulp.task('inject', ['bundle'], () =>
{

    const series = require('stream-series');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    const scriptLib = gulp.src([`${config.build}*lib*.js`], {read: false});
    const styleApp = gulp.src([`${config.build}*.css`, `!${config.build}*lib*.css`], {read: false});
    const scriptApp = gulp.src([`${config.build}*.js`, `!${config.build}*lib*.js`], {read: false});
    const seriesStreams = series(scriptLib, styleApp, scriptApp);

    return gulp.src(`${config.build}index.html`)
        .pipe(plugs.inject(seriesStreams, {
            addPrefix:'/static',
            relative: true
        }))
        .pipe(gulp.dest(config.build));
});

gulp.task('bundle', ['watch'], () =>
{

    return gulp.src(`${config.index}`)
        .pipe(gulp.dest(config.build));
});


gulp.task('bundle', ['watch'], () =>
{

    return gulp.src(`${config.index}`)
        .pipe(gulp.dest(config.build));
});


gulp.task('default', ['inject','build','fonts', 'img','nodemon', 'watch']);

gulp.task('build', ['almundo-hotels-styles', 'scripts-vendor', 'almundo-hotels-scripts']);

gulp.task('watch', ()=>
{

    gulp.watch(config.files.jade, ['almundo-hotels-scripts']);
    gulp.watch(config.files.js, ['almundo-hotels-scripts']);
    gulp.watch(config.files.sass, ['almundo-hotels-styles']);
});


gulp.task('nodemon', () =>
{
    plugs.nodemon({
        script: './code/backend/index.js',
        ext: 'js html',
        env: {
            'DEBUG' : 'template:server'
            ,'NODE_ENV' : 'development'
        }
    })
        .on('restart', function () {
            console.log('server restarted!')
        })
});


module.exports = gulp;
