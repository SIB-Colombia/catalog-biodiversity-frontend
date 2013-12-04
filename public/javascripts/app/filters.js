define(['jquery', 'angular', 'services'], function ($, angular, services) {
	'use strict';

	/* Filters */
  
	angular.module('catalogFrontend.filters', ['catalogFrontend.services']).filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]);
});