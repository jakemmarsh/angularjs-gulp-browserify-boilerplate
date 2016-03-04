'use strict';

const istanbul = require('browserify-istanbul');
const isparta = require('isparta');

function makeConfig(opts) {
    const appFilesGlob = 'app/js/**/!(.spec).js';
    const baseConfig = {
        basePath: '../',

        singleRun: true,

        frameworks: ['jasmine', 'browserify'],

        preprocessors: {
            [appFilesGlob]: ['browserify'],
        },

        browsers: ['Chrome'],

        reporters: ['progress'],

        autoWatch: true,

        browserify: {
            debug: true,
            extensions: ['.js'],
            transform: [
                'babelify',
                'browserify-ngannotate',
                'bulkify',
            ]
        },

        proxies: {
            '/': 'http://localhost:9876/'
        },

        urlRoot: '/__karma__/',

        files: [
            // app-specific code
            'app/js/main.js',

            // 3rd-party resources
            'node_modules/angular-mocks/angular-mocks.js',

            // test files
            'app/js/**/*.spec.js'
        ]

    };

    opts = opts || {};

    if (opts.coverage) {
        baseConfig.preprocessors[appFilesGlob].push('coverage');
        baseConfig.reporters.push('coverage');
        baseConfig.browserify.transform.push(istanbul({
            instrumenter: isparta,
            ignore: ['**/node_modules/**', '**/*.spec.js'],
        }));
        baseConfig.coverageReporter = {
            type: 'lcov',
            dir: 'coverage',
            subdir: '.'
        };
    }

    return baseConfig;
}

const customLaunchers = {
    chrome: {
        base: 'SauceLabs',
        browserName: 'chrome'
    }
};

const ciAdditions = {
    sauceLabs: {
        testName: 'Karma Unit Tests',
        startConnect: false,
        build: process.env.TRAVIS_BUILD_NUMBER,
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },
    browsers: Object.keys(customLaunchers),
    customLaunchers: customLaunchers,
    reporters: ['progress', 'coverage', 'saucelabs'],
};

module.exports = function(config) {
    let baseConfig = makeConfig({
        // no coverage for TDD
        coverage: config.singleRun
    });

    const isCI = process.env.CI && Boolean(process.env.TRAVIS_PULL_REQUEST);
    if (isCI) {
        baseConfig = Object.assign(baseConfig, ciAdditions);
    }

    config.set(baseConfig);
};
