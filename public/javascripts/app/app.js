define(['jquery', 'angular', 'filters', 'services', 'directives', 'controllers', 'angularytics', 'angularRoute', 'angularisotope'], function ($, angular, filters, services, directives, controllers) {
  'use strict';

  // Declare app level module which depends on filters, and services
  return angular.module('catalogFrontend', [
    'ngRoute',
    'iso.directives',
    'catalogFrontend.controllers',
    'catalogFrontend.filters',
    'catalogFrontend.services',
    'catalogFrontend.factories',
    'catalogFrontend.directives',
    'angularytics'
  ]).config(function(AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers(['Console', 'Google']);
  }).run(function(Angularytics) {
    Angularytics.init();
  });
});