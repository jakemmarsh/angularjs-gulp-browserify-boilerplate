angularjs-boilerplate
=====================================
[![Build Status](https://travis-ci.org/mzahor/angularjs-boilerplate.svg)](https://travis-ci.org/mzahor/angularjs-boilerplate.svg?branch=master) [![devDependency Status](https://david-dm.org/mzahor/angularjs-boilerplate/dev-status.svg)](https://david-dm.org/mzahor/angularjs-boilerplate#info=devDependencies)[![Coverage Status](https://coveralls.io/repos/github/mzahor/angularjs-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/mzahor/angularjs-boilerplate?branch=master)

Based on [great boilerplate](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate) by jakemmarsh.

[View contributors](https://github.com/mzahor/angularjs-boilerplate/graphs/contributors)

---

### Getting up and running

1. Clone this repo from `https://github.com/mzahor/angularjs-boilerplate.git`
2. Run `npm install` from the root directory
3. Run `gulp dev` (may require installing Gulp globally `npm install gulp -g`)
4. Your browser will automatically be opened and directed to the browser-sync proxy address
5. To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp dev` during development. More information below)

Now that `gulp dev` is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

#### Other resources

- [Yeoman generator](https://github.com/alferov/generator-angular-gulp-browserify)
- [Cordova-friendly fork](https://github.com/StrikeForceZero/angularjs-cordova-gulp-browserify-boilerplate)

---

This boilerplate uses the latest versions of the following libraries:

- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

Along with many Gulp libraries (these can be seen in either `package.json`, or at the top of each task in `/gulp/tasks/`).

---

### AngularJS

AngularJS is a MVW (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this boilerplate, it is used for all the application routing as well as all of the frontend views and logic.

The AngularJS files are all located within `/app/js`, structured in the following manner:

```
/controllers
  index.js   (the main module on which all controllers will be mounted, loaded in main.js)
  example.js
/directives
  index.js   (the main module on which all directives will be mounted, loaded in main.js)
  example.js
/filters
  index.js (the main module on which all filters will be mounted, loaded in main.js)
  example.js
/services
  index.js   (the main module on which all services will be mounted, loaded in main.js)
  example.js
constants.js  (any constant values that you want to make available to Angular)
main.js       (the main file read by Browserify, also where the application is defined and bootstrapped)
on_run.js     (any functions or logic that need to be executed on app.run)
on_config.js  (all route definitions and any logic that need to be executed on app.config)
templates.js  (this is created via Gulp by compiling your views, and will not be present beforehand)
```

##### Module organization

Controllers, services, directives, etc. should all be placed within their respective folders, and will be automatically required and mounted via their respective `index.js` using `bulk-require`. All modules must export an object of the format:

```javascript
const ExampleModule = function() {};

export default {
  name: 'ExampleModule',
  fn: ExampleModule
};

```

##### Dependency injection

Dependency injection is carried out with the `ng-annotate` library. In order to take advantage of this, a simple directive prologue of the format:

```js
function MyService($http) {
  'ngInject';
  ...
}
```

needs to be added at the very beginning of any Angular functions/modules. The Gulp tasks will then take care of adding any dependency injection, requiring you to only specify the dependencies within the function parameters and nothing more.

---

### SASS

SASS, standing for 'Syntactically Awesome Style Sheets', is a CSS extension language adding things like extending, variables, and mixins to the language. This boilerplate provides a barebones file structure for your styles, with explicit imports into `app/styles/main.scss`. A Gulp task (discussed later) is provided for compilation and minification of the stylesheets based on this file.

---

### Browserify

Browserify is a Javascript file and module loader, allowing you to `require('modules')` in all of your files in the same manner as you would on the backend in a node.js environment. The bundling and compilation is then taken care of by Gulp, discussed below.

---

### Gulp

Gulp is a "streaming build system", providing a very fast and efficient method for running your build tasks.

##### Web Server

Gulp is used here to provide a very basic node/Express web server for viewing and testing your application as you build. It serves static files from the `build/` directory, leaving routing up to AngularJS. All Gulp tasks are configured to automatically reload the server upon file changes. The application is served to `localhost:3002` once you run the `gulp` task. To take advantage of the fast live reload injection provided by browser-sync, you must load the site at the proxy address (within this boilerplate will by default be `localhost:3000`). To change the settings related to live-reload or browser-sync, you can access the UI at `localhost:3001`.

##### Scripts

A number of build processes are automatically run on all of our Javascript files, run in the following order:

- **JSHint:** Gulp is currently configured to run a JSHint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring.
- **Browserify:** The main build process run on any Javascript files. This processes any of the `require('module')` statements, compiling the files as necessary.
- **Babelify:** This uses [babelJS](https://babeljs.io/) to provide support for ES6+ features.
- **Debowerify:** Parses `require()` statements in your code, mapping them to `bower_components` when necessary. This allows you to use and include bower components just as you would npm modules.
- **ngAnnotate:** This will automatically add the correct dependency injection to any AngularJS files, as mentioned previously.
- **Uglifyify:** This will minify the file created by Browserify and ngAnnotate.

The resulting file (`main.js`) is placed inside the directory `/build/js/`.

##### Styles

Just one plugin is necessary for processing our SASS files, and that is `gulp-sass`. This will read the `main.scss` file, processing and importing any dependencies and then minifying the result. This file (`main.css`) is placed inside the directory `/build/css/`.

- **gulp-autoprefixer:** Gulp is currently configured to run autoprefixer after compiling the scss.  Autoprefixer will use the data based on current browser popularity and property support to apply prefixes for you. Autoprefixer is recommended by Google and used in Twitter, WordPress, Bootstrap and CodePen.

##### Images

Any images placed within `/app/images` will be automatically copied to the `build/images` directory. If running `gulp prod`, they will also be compressed via imagemin.

##### Views

When any changes are made to the `index.html` file, the new file is simply copied to the `/build/` directory without any changes occurring.

Files inside `/app/views/`, on the other hand, go through a slightly more complex process. The `gulp-angular-templatecache` module is used in order to process all views/partials, creating the `template.js` file briefly mentioned earlier. This file will contain all the views, now in Javascript format inside Angular's `$templateCache` service. This will allow us to include them in our Javascript minification process, as well as avoid extra HTTP requests for our views.

##### Watching files

All of the Gulp processes mentioned above are run automatically when any of the corresponding files in the `/app` directory are changed, and this is thanks to our Gulp watch tasks. Running `gulp dev` will begin watching all of these files, while also serving to `localhost:3002`, and with browser-sync proxy running at `localhost:3000` (by default).

##### Production Task

Just as there is the `gulp dev` task for development, there is also a `gulp prod` task for putting your project into a production-ready state. This will run each of the tasks, while also adding the image minification task discussed above. There is also an empty `gulp deploy` task that is included when running the production task. This deploy task can be fleshed out to automatically push your production-ready site to your hosting setup.

**Reminder:** When running the production task, gulp will not fire up the express server and serve your index.html. This task is designed to be run before the `deploy` step that may copy the files from `/build` to a production web server.

##### Pre-compressing text assets

When running with `gulp prod`, a pre-compressed file is generated in addition to uncompressed file (.html.gz, .js.gz, css.gz). This is done to enable web servers serve compressed content without having to compress it on the fly. Pre-compression is handled by `gzip` task.

##### Testing

A Gulp tasks also exists for running the test framework (discussed in detail below). Running `gulp test` will run any and all tests inside the `/test` directory and show the results (and any errors) in the terminal.

---

### Testing

This boilerplate also includes a simple framework for unit and end-to-end (e2e) testing via [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/). In order to test AngularJS modules, the [angular.mocks](https://docs.angularjs.org/api/ngMock/object/angular.mock) module is used.

All of the tests can be run at once with the command `gulp test`. However, the tests are broken up into two main categories:

##### End-to-End (e2e) Tests

e2e tests, as hinted at by the name, consist of tests that involve multiple modules or require interaction between modules, similar to integration tests. These tests are carried out using the Angular library [Protractor](https://github.com/angular/protractor), which also utilizes Jasmine. The goal is to ensure that the flow of your application is performing as designed from start to finish.

In this boilerplate, two end-to-end test examples are provided:

- `routes_spec.js`, which tests the functionality of our AngularJS routing
- `example_spec.js`, which tests the functionality of the example route, controller, and view

More examples can be seen at the above link for Protractor.

All e2e tests are run with `gulp protractor`.

**Notes:**

- before running the Protractor tests, the application server must be running (start it with `gulp dev`)
- the Protractor library used for the end-to-end tests may require installing the [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html) beforehand.

##### Unit Tests

Unit tests are used to test a single module (or "unit") at a time in order to ensure that each module performs as intended individually. In AngularJS this could be thought of as a single controller, directive, filter, service, etc. That is how the unit tests are organized in this boilerplate.

An example test is provided for the following types of AngularJS modules:

- `unit/controllers/example_spec.js`
- `unit/services/example_spec.js`
- `unit/directives/example_spec.js`
- `unit/constants_spec.js`

All unit tests are run with `gulp unit`. When running unit tests, code coverage is simultaneously calculated and output as an HTML file to the `/coverage` directory.
