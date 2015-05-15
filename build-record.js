({
	baseUrl: "public/javascripts/app",
	optimize: "uglify2",
	paths: {
		jquery: '../../components/jquery/dist/jquery.min',
		jqueryui: '../../components/jquery-ui/jquery-ui.min',
		bootstrap: '../../components/bootstrap/dist/js/bootstrap.min',
		angular: '../../components/angular/angular.min',
		angularRoute: '../../components/angular-route/angular-route.min',
		angularMocks: '../../components/angular-mocks/angular-mocks',
		angularSanitize: '../../components/angular-sanitize/angular-sanitize.min',
		angularytics: '../../components/angularytics/dist/angularytics.min',
		mapbox: '../../components/mapbox.js/mapbox',
		leafletMarkercluster: '../../components/leaflet.markercluster/dist/leaflet.markercluster',
		photogallery: '../../javascripts/photogallery.min',
		photoSwipe: '../../components/photo.swipe/dist/photoswipe.min',
		photoSwipe_ui_default: '../../components/photo.swipe/dist/photoswipe-ui-default.min'
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
		},
		'mapbox': {
			exports: 'L'
		},
		'leafletMarkercluster': {
			deps: ['mapbox']
		},
		'photogallery':{
			deps: ['jquery']
		}
	},
	priority: [
		"angular"
	],
	name: "../record",
	out: "public/javascripts/record-built.js"
})
