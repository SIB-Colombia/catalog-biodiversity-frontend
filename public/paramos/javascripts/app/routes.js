define(['jquery', 'angular', 'app'], function ($, angular, app) {
  'use strict';

  return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/paramos/partials/home',
      controller: 'WallHomeCtrl'
    })
    .when('/insectos', {
      templateUrl: '/paramos/partials/home',
      controller: 'WallInsectaCtrl'
    })
    .when('/aves', {
      templateUrl: '/paramos/partials/home',
      controller: 'WallAvesCtrl'
    })
    .when('/plantas', {
      templateUrl: '/paramos/partials/home',
      controller: 'WallPlantaeCtrl'
    })
    .when('/mamiferos', {
      templateUrl: '/paramos/partials/home',
      controller: 'WallMammaliaCtrl'
    })
    .when('/reptiles', {
      templateUrl: '/paramos/partials/home',
      controller: 'WallReptiliaCtrl'
    })
    .when('/anfibios', {
      templateUrl: '/paramos/partials/home',
      controller: 'WallAmphibiaCtrl'
    })
    .when('/hongos', {
      templateUrl: '/paramos/partials/home',
      controller: 'WallFungiCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
});