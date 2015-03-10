define([], function() {
	return ['$scope', '$http', 'Record', 'MapData', function($scope, $http, Record, MapData) {
		// You can access the scope of the controller from here
		$scope.record = new Record();
		
		var handleSuccess = function(data,status){
			var map = L.map('distributionmap').setView([4, -75], 5);
			var mapQuestAttr = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a>';
			
			var mopt = {
				url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg',
				options: {attribution:mapQuestAttr , subdomains:'1234'},
				tileSize: 1000
			};
			var mq=L.tileLayer(mopt.url,mopt.options);

			mq.addTo(map);
			if(data.error == 'No entries for current query.'){
				var dinoIcon =L.icon({
					iconUrl: '../../images/zoo-24@2x.png',
					iconSize:[50,50],
					iconAnchor:[45,80],
					popupAnchor:[-3,-76]
				});
				L.marker([4.35,-74.04 ], {icon:dinoIcon}).addTo(map)
				.bindPopup('No hay Registros con coordenadas para este taxon.')
				.openPopup();
				$scope.mensaje = 'No hay registros biológicos publicados. ';
			}else{
				if(data.totalMatched > 0){
				var clusters = new L.markerClusterGroup({
					spiderfyOnMaxZoom: true,
					showCoverageOnHover: true,
					zoomToBoundsOnClick: true,
					removeOutsideVisibleBounds: true
				});
				$scope.mensaje = 'Mostrando ' + data.features[0].geometry.geometries.length + ' registros biológicos de ' + data.totalMatched + ' publicados. '
				$scope.masRegistros = 'http://data.sibcolombia.net/species/'+data.query.scientificname;
				for (var i = 0; i < data.features[0].geometry.geometries.length; i++) {
					var a = data.features[0].geometry.geometries[i].coordinates;
					var title = '<strong><a href="http://data.sibcolombia.net/occurrences/'+(data.features[0].geometry.geometries[i].properties.occurrenceID).toString()+'" target="new"> '+ 'Detalles del Registro Biologico No. ' + data.features[0].geometry.geometries[i].properties.occurrenceID +'</a></strong>';
					L.Icon.Default.imagePath = '../../images';
					var marker = new L.marker(new L.LatLng(a[1], a[0]));
					marker.bindPopup(title);
					clusters.addLayer(marker);
				}
				map.addLayer(clusters);
				}else{
					var dinoIcon =L.icon({
						iconUrl: '../../images/zoo-24@2x.png',
						iconSize:[50,50],
						iconAnchor:[45,80],
						popupAnchor:[-3,-76]
					});
					L.marker([4.35,-74.04 ], {icon:dinoIcon}).addTo(map)
					.bindPopup('No hay Registros con coordenadas para este taxon.')
					.openPopup();
				}
			}
		};
		
		MapData.mapData().success(handleSuccess);


		$scope.bibliographicReference = function(autor, documento_titulo, fecha, lugar_publicacion) {
			var text = autor;
			if(fecha != "") {
				text = text + " (" + fecha + ") ";
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
