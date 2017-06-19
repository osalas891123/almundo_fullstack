'use strict';

module.exports = function () {
    const pkg = require('./package.json');

    const server = './backend/';
    const src = './code/';
    const scssfolder = `${src }frontend/sass/`;
    const mainscss = `${scssfolder }styles.sass`;
    const build = './dist/';
    const appFolder = `${src}frontend/app/`;
    const index = `${src }frontend/index.html`;

    const config = {
        projectName: pkg.name,
        appFolder,
        app: `${appFolder }app.module.js`,
        scssfolder,
        mainscss,
        angularRootApp: `${appFolder}core/`,
        build,
        index,
        src,
        images: `${src }frontend/img/`,
        fonts: `${scssfolder }fonts/`,
        vendorfolder: `${src }frontend/vendor/`,
        templateCache: {
            file: 'app.templates.js',
            options: {
                module: 'hotelsResultModule',
                moduleSystem: "IIFE"
            }
        },
        jsOrder: ['**/app.module.js', '**/*.module.js', '**/*.js'],
        files: {
            sass: `${src}**/*.sass`,
            js: [`${src}/frontend/app/**/*.js`, `!${src}**/*.templates.js`],
            html: `${src}**/*.html`,
            jade: `${src}**/*.jade`

        }
    };

    return config;
};
