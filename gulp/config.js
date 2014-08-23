module.exports = {
  "serverport": 3000,
  "sass": {
    "src" : "app/sass/**/*.scss",
    "dest": "build/assets"
  },
  "scripts": {
    "src" : "app/javascripts/**/*.js",
    "dest": "build/assets"
  },
  "images": {
    "src" : "app/images/**",
    "dest": "build/assets"
  },
  "views": {
    "src": [
      "app/index.html",
      "app/views/**/*.html"
    ],
    "dest": "app/javascripts"
  },
  "dist": {
    "root"  : "build",
    "assets": "build/assets"
  },
  "browserify": {
    "entries"   : ["./app/javascripts/main.js"],
    "bundleName": "main.js"
  }
}