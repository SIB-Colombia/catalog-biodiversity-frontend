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
		text: '../../components/requirejs-text/text',
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
		}
	}
});

// Load the main app module to start the app
require(['jquery', 'angular', 'app.internal', 'jqueryui', 'bootstrap'], function($, angular, app) {
	'use strict';

	// Google analytics code
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-1418857-10', 'sibcolombia.net');
  ga('send', 'pageview');

  // Angular initialization
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	// Initialize angular app
	angular.element().ready(function() {
		//$html.addClass('ng-app');
		$html.attr('data-ng-app', app['name']);
		angular.bootstrap($html, [app['name']]);
	});

});