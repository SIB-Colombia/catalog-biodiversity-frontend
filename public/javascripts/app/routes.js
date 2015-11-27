define(['jquery', 'angular', 'app'], function ($, angular, app) {
  'use strict';

  return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/homeinvasoras',
      controller: ''
    })
    .when('/catalogo', {
      templateUrl: '/partials/home',
      controller: 'WallHomeCtrl'
    })
    .when('/insectos', {
      templateUrl: '/partials/home',
      controller: 'WallInsectaCtrl'
    })
    .when('/aves', {
      templateUrl: '/partials/home',
      controller: 'WallAvesCtrl'
    })
    .when('/plantas', {
      templateUrl: '/partials/home',
      controller: 'WallPlantaeCtrl'
    })
    .when('/mamiferos', {
      templateUrl: '/partials/home',
      controller: 'WallMammaliaCtrl'
    })
    .when('/reptiles', {
      templateUrl: '/partials/home',
      controller: 'WallReptiliaCtrl'
    })
    .when('/anfibios', {
      templateUrl: '/partials/home',
      controller: 'WallAmphibiaCtrl'
    })
    .when('/hongos', {
      templateUrl: '/partials/home',
      controller: 'WallFungiCtrl'
    })
    .when('/moluscos', {
      templateUrl: '/partials/home',
      controller: 'WallMoluscosCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
});