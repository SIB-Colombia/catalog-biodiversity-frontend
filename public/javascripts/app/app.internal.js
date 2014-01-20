define(['jquery', 'angular', 'filters', 'services', 'directives', 'controllers.internal', 'angularytics', 'angularRoute'], function ($, angular, filters, services, directives, controllers) {
  'use strict';

  // Declare app level module which depends on filters, and services
  return angular.module('catalogFrontend', [
    'ngRoute',
    'catalogFrontend.controllers',
    'catalogFrontend.filters',
    'catalogFrontend.services',
    'catalogFrontend.factories',
    'catalogFrontend.directives',
    'angularytics'
  ]).config(function(AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  }).run(function(Angularytics) {
    Angularytics.init();
  });
});