function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('movies', {
            url: '/movies',
            template: '<movies></movies>',
            title: 'Movies',
        });

    $urlRouterProvider.otherwise('/movies');

}

export default OnConfig;
