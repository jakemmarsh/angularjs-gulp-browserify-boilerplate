/* global module */

'use strict';

fdescribe('Unit: MovieComponent', function() {

    let element;
    let scope;

    beforeEach(function() {
        angular.mock.module('app.movies');

        angular.mock.inject(($compile, $rootScope) => {
            scope = $rootScope;
            scope.movie = {
                name: 'Superman'
            };
            let jElement = angular.element(
                '<movie movie="movie">Sample Directive</movie>'
            );

            $compile(jElement)(scope);
            scope.$digest();
            element = jElement[0];
        });
    });

    it('should render template', function() {
        expect(element.querySelector('.movie-component')).not.toBe(null);
    });

    it('should render movie name', function() {
        expect(html()).toContain('Superman');
    });

    function html() {
        return element.innerHTML;
    }

});
