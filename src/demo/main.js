import angular from 'angular';

// angular modules
import onConfig  from './on_config';
import 'angular-ui-router';
import './templates';
import '../component';
import {default as demoCtrl} from './demo.controller';

// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'gsf.example-component'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').config(onConfig);

angular.module('app').controller(demoCtrl.name, demoCtrl.fn);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
