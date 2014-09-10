define(['jquery', 'angular', 'app'], function ($, angular, app) {
  'use strict';

  return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/humedales/partials/home',
      controller: 'WallHomeCtrl'
    })
    .when('/insectos', {
      templateUrl: '/humedales/partials/home',
      controller: 'WallInsectaCtrl'
    })
    .when('/aves', {
      templateUrl: '/humedales/partials/home',
      controller: 'WallAvesCtrl'
    })
    .when('/plantas', {
      templateUrl: '/humedales/partials/home',
      controller: 'WallPlantaeCtrl'
    })
    .when('/mamiferos', {
      templateUrl: '/humedales/partials/home',
      controller: 'WallMammaliaCtrl'
    })
    .when('/reptiles', {
      templateUrl: '/humedales/partials/home',
      controller: 'WallReptiliaCtrl'
    })
    .when('/anfibios', {
      templateUrl: '/humedales/partials/home',
      controller: 'WallAmphibiaCtrl'
    })
    .when('/hongos', {
      templateUrl: '/humedales/partials/home',
      controller: 'WallFungiCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
});