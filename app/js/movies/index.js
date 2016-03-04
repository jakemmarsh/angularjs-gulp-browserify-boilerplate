import angular from 'angular';

const moviesModule = angular.module('app.movies', []);

function register(obj) {
    moviesModule[obj.type](obj.name, obj.fn());
}

import MovieComponent from './components/movie.component';
register(MovieComponent);


export default moviesModule;
