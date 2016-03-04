'use strict';

export default {

    browserPort: 3000,
    UIPort: 3001,

    sourceDir: './app/',
    buildDir: './build/',

    covDir: './coverage/',

    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/css',
        prodSourcemap: false,
        sassIncludePaths: []
    },

    scripts: {
        src: 'app/js/**/!(.spec).js',
        dest: 'build/js',
        test: 'app/js/**/*.spec.js',
    },

    images: {
        src: 'app/images/**/*',
        dest: 'build/images'
    },

    fonts: {
        src: ['app/fonts/**/*'],
        dest: 'build/fonts'
    },

    assetExtensions: [
        'js',
        'css',
        'png',
        'jpe?g',
        'gif',
        'svg',
        'eot',
        'otf',
        'ttc',
        'ttf',
        'woff2?'
    ],

    views: {
        index: 'app/index.html',
        src: 'app/js/**/*.html',
        dest: 'app/js'
    },

    gzip: {
        src: 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
        dest: 'build/',
        options: {}
    },

    browserify: {
        bundleName: 'main.js',
        prodSourcemap: false
    },

    test: {
        karma: 'test/karma.conf.js',
        protractor: 'test/protractor.conf.js'
    },

    init: function() {
        this.views.watch = [
            this.views.index,
            this.views.src
        ];

        return this;
    }

}.init();
