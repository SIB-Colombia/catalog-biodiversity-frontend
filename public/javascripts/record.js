requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: '/javascripts/app',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		jquery: '../../components/jquery/jquery.min',
		jqueryui: '../../components/jquery-ui/ui/jquery-ui',
		bootstrap: '../../components/bootstrap/dist/js/bootstrap.min',
		angular: '../../components/angular/angular.min',
		angularRoute: '../../components/angular-route/angular-route.min',
		angularMocks: '../../components/angular-mocks/angular-mocks',
		angularSanitize: '../../components/angular-sanitize/angular-sanitize.min',
		angularytics: '../../components/angularytics/dist/angularytics.min'
	},
	shim: {
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angularRoute': {
			deps: ['angular']
		},
		'angularMocks': {
			deps: ['angular'],
			'exports':'angular.mock'
		},
		'angularSanitize': {
			deps: ['angular']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'jqueryui': {
			deps: ['jquery']
		},
		'angularytics': {
			deps: ['angular']
		},
		'nginfinitescroll': {
			deps: ['angular']
		},
		'angularSanitize': {
			deps: ['angular']
		}
	},
	priority: [
		"angular"
	]
});

// Load the main app module to start the app
require(['jquery', 'angular', 'app.internal', 'jqueryui', 'bootstrap'], function($, angular, app) {
	'use strict';

  // Angular initialization
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	// Initialize angular app
	angular.element().ready(function() {
		//$html.addClass('ng-app');
		$html.attr('data-ng-app', app['name']);
		angular.bootstrap($html, [app['name']]);
	});

});
