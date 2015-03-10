({
	baseUrl: "public/javascripts/app",
	optimize: "uglify2",
	paths: {
		jquery: '../../components/jquery/dist/jquery.min',
		jqueryui: '../../components/jquery-ui/jquery-ui.min',
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
		}
	},
	priority: [
		"angular"
	],
	name: "../main",
	out: "public/javascripts/main-built.js"
})