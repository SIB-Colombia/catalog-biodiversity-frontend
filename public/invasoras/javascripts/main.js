requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: '/invasoras/javascripts/app',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		jquery: '../../components/jquery/dist/jquery.min',
		jqueryui: '../../components/jquery-ui/ui/jquery-ui',
		bootstrap: '../../components/bootstrap/dist/js/bootstrap.min',
		angular: '../../components/angular/angular.min',
		angulari18n: '../../components/angular-i18n/angular-locale_es-co',
		angularRoute: '../../components/angular-route/angular-route.min',
		angularMocks: '../../components/angular-mocks/angular-mocks',
		angularSanitize: '../../components/angular-sanitize/angular-sanitize.min',
		angularytics: '../../components/angularytics/dist/angularytics.min',
		nginfinitescroll: '../../components/nginfinitescroll/build/ng-infinite-scroll.min',
		isotope: '../../components/isotope/jquery.isotope.min',
		angularisotope: '../../components/angular-isotope/dist/angular-isotope.min'
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
		'bootstrap': {
			deps: ['jquery']
		},
		'jqueryui': {
			deps: ['jquery']
		},
		'angularytics': {
			deps: ['angular']
		},
		'isotope': {
			deps: ['jquery']
		},
		'angularisotope': {
			deps: ['jquery', 'isotope', 'angular']
		},
		'nginfinitescroll': {
			deps: ['angular']
		},
		'angularSanitize': {
			deps: ['angular']
		},
		'angulari18n': {
			deps: ['angular']
		}
	},
	priority: [
		"angular"
	]
});

// Load the main app module to start the app
require(['jquery', 'angular', 'app', 'routes', 'jqueryui', 'bootstrap'], function($, angular, app, routes) {
	'use strict';

  // Angular initialization
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	// Initialize angular app
	angular.element().ready(function() {
		//$html.addClass('ng-app');
		$html.attr('data-ng-app', app['name']);
		angular.bootstrap($html, [app['name']]);
	});

	// Enable accordion on main site (hiding link section)
	$( document ).ready(function() {
		// Enable accordion on main site (hiding link section)
		$( document ).ready(function() {
			var icons = {
				header: "ui-icon-circle-arrow-e",
				activeHeader: "ui-icon-circle-arrow-s"
			};
			$("footer").accordion({ collapsible: true, animate: "easeOutQuad", active: false, icons: icons });
			$( "#toggle" ).button().click(function() {
				$( "section" ).accordion( "disable" );
				if ( $("#accordion").accordion( "option", "icons" ) ) {
					$("#accordion").accordion( "option", "icons", null );
				} else {
					$("#accordion").accordion( "option", "icons", icons );
				}
			});
		});
		if($("#isotopeContainer").length != 0) {
			setTimeout(function() {
				$("#isotopeContainer").isotope('reLayout');
			}, 3000);
		} else {
			setTimeout(function() {
				$("#isotopeContainer").isotope('reLayout');
			}, 8000);
		}
	});

});
