angularjs-gulp-browserify-boilerplate
=====================================

A boilerplate using AngularJS, SASS, Gulp, and Browserify that also utilizes [these best AngularJS practices](https://github.com/toddmotto/angularjs-styleguide) and Gulp best practices from [this fantastic resource](https://github.com/greypants/gulp-starter).

---

### Getting up and running

1. Clone this repo from `https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate.git`
2. Run `npm install` from the root directory
3. Run `bundle install` from the root directory [note: this requires ruby to be installed]
4. If you want to run [browser-sync](http://www.browsersync.io/) on a different port (default is 3000), edit the `serverport` in `/gulp/config.js`, then...
5. Run `gulp` (may require installing Gulp globally `npm install gulp -g`)
6. Behold! Your browser will be opened, pointed at the proxy address
7. To prepare assets for production, run the `gulp production` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp` during development. More information below)

Now that `gulp` is running, the server is up as well. Any changes will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

---

This boilerplate uses the latest versions of the following libraries:

- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

Along with many Gulp libraries (these can be seen in `package.json`, or at the top of each task in `/gulp/tasks/`).

---

### AngularJS

AngularJS is a MVW (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this boilerplate, it is used for all the application routing as well as all of the frontend views and logic.

##### File Organization

The AngularJS files are all located within `/app/javascripts`, structured in the following manner:

```
/controllers
  _index.js   (the main module on which to mount all controllers, loaded in main.js)
  example.js
/directives
  _index.js   (the main module on which to mount all directives, loaded in main.js)
  example.js
/services
  _index.js   (the main module on which to mount all services, loaded in main.js)
  example.js
constants.js  (any constant values that you want to make available to Angular)
main.js       (the main file read by Browserify, also where the application is defined and bootstrapped)
on_run.js     (any functions or logic that need to be executed on app.run)
routes.js     (all route definitions and logic)
templates.js  (this is created via Gulp by compiling your views, and will not be present beforehand)
```

Controllers, services, directives, etc. should all be placed within their respective folders and mounted on their respective `_index.js` module. Most other logic can be placed in an existing file, or added in new files as long as it is required inside `main.js`.

**Note:** The folder structure of the output directory `/build` is slightly different than the source directories in `/app`. Instead of having a folder for javascript, css, and images, all assets are put into `/build/assets` which makes revving and referencing them simple. Keep this in mind when setting up your project. Reference assets in your views/templates via `/assets/*`.

##### Dependency injection

Dependency injection is carried out with the `ng-annotate` library. In order to take advantage of this, a simple comment of the format:

```
/**
 * @ngInject
 */
```

needs to be added directly before any Angular functions/modules. The Gulp tasks will then take care of adding any dependency injection, requiring you only to specify the dependencies within the function call and nothing more.

---

### SASS

SASS, standing for 'Syntactically Awesome Style Sheets', is a CSS extension language adding things like extending, variables, and mixins to the language. This boilerplate provides a barebones file structure for your styles, with explicit imports into `app/sass/main.scss`. A Gulp task (discussed later) is provided for compilation and minification of the stylesheets based on this file.

---

### Browserify

Browserify is a Javascript file and module loader, allowing you to `require('modules')` in all of your files in the same manner as you would on the backend in a node.js environment. It also provides powerful transforms that allow for complex substitution and dependency injection. The bundling and compilation is then taken care of by Gulp, discussed below.

Additonal configuration for browserify can be specified in `package.json`. In this boilerplate there is only one option specified there:

```
"browserify": {
	"transform": [
		"browserify-ngannotate"
	]
}
```

This tells browserify to use the browserify-ngannotate transform.

---

### Gulp

Gulp is a "streaming build system", providing a very fast and efficient method for running your build tasks.

##### Web Server

Gulp is used here to provide a very basic node/Express web server for viewing and testing your application as you build. It serves static files from the `build/` directory, leaving routing up to AngularJS. All Gulp tasks are configured to automatically reload the server upon file changes. The application is served to `localhost:3000` once you run the `gulp` task. To take advantage of the fast live reload injection provided by browser-sync, you must load the site at the proxy address (which usually defaults to `server port + 1`, and within this boilerplate will by default be `localhost:3001`.)

##### Scripts

A number of build processes are automatically run on all of our Javascript files, run in the following order:

- **JSHint:** Gulp is currently configured to run a JSHint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring.
- **Browserify:** The main build process run on any Javascript files. This processes any of the `require('module')` statements, compiling the files as necessary.
- **ngAnnotate:** This will automatically add the correct dependency injection to any AngularJS files, as mentioned previously.

The resulting file (`main.js`) is placed inside the directory `/build/assets/`.

In production mode, the following processes will also run:

- **Uglify:** This will minify the file created by Browserify.
- **Rev:** This task will append a hash to the end of each asset (e.g. `main-jf297d4.js`), allowing for smarter cache-busting when setting far-future expires headers. This task also produces a `rev-manifest.json` which contains a list of correlations between rev'd and non-rev'd assets.
- **RevCollector:** Because angular templates are likely to contain references to fonts or images, and are compiled with all other javascript source into the browserify bundle, references to static assets must be replaced with their rev'd versions.

This will output the rev'd file (`main-#{hash}.js`) which will replace the non-rev'd version in `/build/assets/`.

##### Styles

Just one task is necessary for processing our SASS files, and that is the `sass` gulp task. This will read the `main.scss` file, processing and importing any dependencies and then minifying the result. This file (`main.css`) is placed inside the directory `/build/assets/`. Sass is compiled using `gulp-ruby-sass` with the `compass: true` flag set.

In production mode a similar set of steps are performed on the sass files as the javascript files. First everything is concatenated, then minified, and finally any static references to assets are replaced with the rev'd versions.

##### Views

When any changes are made to the `index.html` file, the new file is simply copied to the `/build/` directory without any changes occurring.

Files inside `/app/views/`, on the other hand, go through a slightly more complex process. The `gulp-angular-templatecache` module is used in order to process all views/partials, creating the `template.js` file briefly mentioned earlier. This file will contain all the views, now in Javascript format inside Angular's `$templateCache` service. This will allow us to include them in our Javascript minification process, as well as avoid extra HTTP requests for our views.

##### Watching files

All of the Gulp processes mentioned above are run automatically when any of the corresponding files in the `/app` directory are changed, and this is thanks to our Gulp watch tasks. Running `gulp` will begin watching all of these files, while also serving to `localhost:3000`, and with browser-sync proxy running at `localhost:3001` (by default).

### Gulp Production

This production setup is designed to provide some of the niceties that, for example, the rails asset pipeline provides such as hashed filenames, and updating references to static assets within your templates, views, and stylesheets. Doing this allows you set far-future expires headers on most of your assets and optimize the benefits your user/visitors get from browser cacheing.

Run it with:

`gulp production`

**Reminder:** When running the production task, gulp will not fire up the express server and serve your index.html. This task is designed to be run before a deploy step that may copy the files from `/build` to a production webserver.

---

### Testing

TODO: Add a framework for Karma testing.
