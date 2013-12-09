define(['jquery', 'angular', 'app'], function ($, angular, app) {
  'use strict';

  return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/home',
      controller: 'WallCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
});