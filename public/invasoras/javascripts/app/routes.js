define(['jquery', 'angular', 'app'], function ($, angular, app) {
  'use strict';

  return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/invasoras/partials/home',
      controller: 'WallHomeCtrl'
    })
    .when('/insectos', {
      templateUrl: '/invasoras/partials/home',
      controller: 'WallInsectaCtrl'
    })
    .when('/aves', {
      templateUrl: '/invasoras/partials/home',
      controller: 'WallAvesCtrl'
    })
    .when('/plantas', {
      templateUrl: '/invasoras/partials/home',
      controller: 'WallPlantaeCtrl'
    })
    .when('/mamiferos', {
      templateUrl: '/invasoras/partials/home',
      controller: 'WallMammaliaCtrl'
    })
    .when('/reptiles', {
      templateUrl: '/invasoras/partials/home',
      controller: 'WallReptiliaCtrl'
    })
    .when('/anfibios', {
      templateUrl: '/invasoras/partials/home',
      controller: 'WallAmphibiaCtrl'
    })
    .when('/hongos', {
      templateUrl: '/invasoras/partials/home',
      controller: 'WallFungiCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
});