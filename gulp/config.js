export default {

  browserPort: 3000,
  UIPort: 3001,
  testPort: 3002,

  sourceDir: './src/',
  buildDir: './build/',
  distDir: './dist/',

  styles: {
    src: 'src/demo/styles/**/*.scss',
    dest: 'build/css',
    prodSourcemap: false,
    sassIncludePaths: []
  },
  componentViews: {
    src: ['src/component/**/*.html'],
    templateName: 'gsf.example-component.tpls',
    dest: 'src/component'
  },

  scripts: {
    src: 'src/**/*.js',
    dest: 'build/js',
    test: 'test/**/*.js',
    gulp: 'gulp/**/*.js'
  },

  fonts: {
    src: [],
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
    index: 'src/demo/index.html',
    src: 'src/**/*.html',
    dest: 'src/demo'
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
