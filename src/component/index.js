import angular from 'angular';
import './templates';
import 'angular-ui-bootstrap';

const bulk = require('bulk-require');

// Create a new angular module for this feature
const featureModule = angular.module('gsf.example-component', [
  'ui.bootstrap',
  'gsf.example-component.tpls' /* Ensure this matches with gulp.config.componentViews.templateName */
]);

// Into this module, import all the angular controllers, factories, directives etc. found in this
// folder and subfolders, using naming conventions e.g. <name>.directive.js
const components = bulk(__dirname, ['./**/!(*index|*.spec).component.js']);

// Load the imported items into angular
declare(components, featureModule.component);

function declare(controllerMap, declarationLoader) {
  Object.keys(controllerMap).forEach((key) => {
    let item = controllerMap[key];

    if (!item) {
      return;
    }

    if (item.fn && (typeof item.fn === 'function' || typeof item.fn === 'object')) {
      declarationLoader(item.name, item.fn);
    } else {
      declare(item, declarationLoader);
    }
  });
}

export default featureModule;
