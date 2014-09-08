define(['jquery', 'angular', 'filters', 'services', 'directives', 'controllers', 'angularytics', 'angularRoute', 'angularisotope', 'angulari18n'], function ($, angular, filters, services, directives, controllers) {
  'use strict';

  // Declare app level module which depends on filters, and services
  return angular.module('catalogFrontend', [
    'ngRoute',
    'ngLocale',
    'iso.directives',
    'catalogFrontend.controllers',
    'catalogFrontend.filters',
    'catalogFrontend.services',
    'catalogFrontend.factories',
    'catalogFrontend.directives',
    'angularytics'
  ]).config(['AngularyticsProvider', function (AngularyticsProvider) {
      AngularyticsProvider.setEventHandlers(['Console', 'Google']);
  }]).run(['Angularytics', function (Angularytics) {
      Angularytics.init();
  }]);
});
