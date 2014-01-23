({
	baseUrl: "public/javascripts/app",
	optimize: "uglify2",
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
		'bootstrap': {
			deps: ['jquery']
		},
		'jqueryui': {
			deps: ['jquery']
		},
		'angularytics': {
			deps: ['angular']
		},
		'angularSanitize': {
			deps: ['angular']
		}
	},
	priority: [
		"angular"
	],
	name: "../record",
	out: "public/javascripts/record-built.js"
})