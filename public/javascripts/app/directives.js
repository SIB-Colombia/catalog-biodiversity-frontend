define(['jquery', 'angular', 'services'], function ($, angular, services) {
	'use strict';

	/* Directives */
	angular.module('catalogFrontend.directives', ['catalogFrontend.services']).directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]);
});