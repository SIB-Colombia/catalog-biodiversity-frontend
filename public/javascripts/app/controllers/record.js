define([], function() {
	return ['$scope', '$http', 'Record', function($scope, $http, Record) {
		// You can access the scope of the controller from here
		$scope.record = new Record();

		$scope.bibliographicReference = function(autor, documento_titulo, fecha, lugar_publicacion) {
			var text = autor;
			if(fecha != "") {
				text = text + " (" + autor + ") ";
			}
			text = text + documento_titulo + " " + lugar_publicacion;
			return text;
		};

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});