define(['jquery', 'photoSwipe', 'photoSwipe_ui_default'], function($, PhotoSwipe, PhotoSwipeUI_Default) {
	return ['$scope', '$http', '$window', 'Record', 'MapData', function($scope, $http, $window, Record, MapData) {
		// You can access the scope of the controller from here
		$scope.record = new Record();

		var handleSuccess = function(data,status){
			var map = L.mapbox.map('distributionmap');
			var mapQuestAttr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> ';

			var mopt = {
				url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				options: {attribution: mapQuestAttr},
				tileSize: 1000
			};
			var mq = new L.tileLayer(mopt.url,mopt.options);
			map.setView(new L.LatLng(4, -75),5);
			map.addLayer(mq);
			//mq.addTo(map);
			if(data.error == 'No entries for current query.' || data.totalMatched < 0){
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
				var clusters = new L.markerClusterGroup({
					spiderfyOnMaxZoom: true,
					showCoverageOnHover: true,
					zoomToBoundsOnClick: true,
					removeOutsideVisibleBounds: true
				});

				$scope.mensaje = 'Mostrando ' + data.features[0].geometry.geometries.length + ' registros biológicos de ' + data.totalMatched + ' publicados. '
				$scope.masRegistros = "<a href='http://data.sibcolombia.net/species/" + data.query.scientificname + "' target='new' > Ver más </a>";
				for (var i = 0; i < data.features[0].geometry.geometries.length; i++) {
					var a = data.features[0].geometry.geometries[i].coordinates;
					var title = '<strong><a href="http://data.sibcolombia.net/occurrences/'+(data.features[0].geometry.geometries[i].properties.occurrenceID).toString()+'" target="new"> '+ 'Detalles del Registro Biologico No. ' + data.features[0].geometry.geometries[i].properties.occurrenceID +'</a></strong>';
					L.Icon.Default.imagePath = '../images';
					var marker = new L.marker(new L.LatLng(a[1], a[0]));
					marker.bindPopup(title);
					clusters.addLayer(marker);
				}
				map.addLayer(clusters);
			}
		};

		/*

		$(".rslides").photoGallery({
			timeout: 10000,
			speed: 3000,
			pager: true,
			random: true,
			pause: true
		});

		var initPhotoSwipeFromDOM = function(gallerySelector) {
			// parse slide data (url, title, size ...) from DOM elements
			// (children of gallerySelector)
			var parseThumbnailElements = function(el) {
				var thumbElements = el,
					numNodes = el.length,
					items = [],
					figureEl,
					linkEl,
					size,
					item;

				for(var i = 0; i < numNodes; i++) {
					figureEl = thumbElements[i].children[0]; // <figure> element

					// include only element nodes
					if(figureEl.nodeType !== 1) {
						continue;
					}

					linkEl = figureEl.children[0]; // <a> element


					if(linkEl.getAttribute('data-size') !== null) {
						size = linkEl.getAttribute('data-size').split('x');
					}

					// create slide object
					item = {
						src: linkEl.getAttribute('href'),
						w: parseInt(size[0], 10),
						h: parseInt(size[1], 10)
					};

					if(figureEl.children.length > 1) {
						// <figcaption> content
						item.title = figureEl.children[1].innerHTML;
					}

					if(linkEl.children.length > 0) {
						// <img> thumbnail element, retrieving thumbnail url
						item.msrc = linkEl.children[0].getAttribute('src');
					}

					item.el = figureEl; // save link to element for getThumbBoundsFn
					items.push(item);
				}

				return items;
			};

			// find nearest parent element
			var closest = function closest(el, fn) {
				return el && ( fn(el) ? el : closest(el.parentNode, fn) );
			};

			// triggers when user clicks on thumbnail
			var onThumbnailsClick = function(e) {
				e = e || window.event;
				e.preventDefault ? e.preventDefault() : e.returnValue = false;

				var eTarget = e.target || e.srcElement;

				// find root element of slide
				var clickedListItem = closest(eTarget, function(el) {
					return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
				});

				if(!clickedListItem) {
					return;
				}

				// find index of clicked item by looping through all child nodes
				// alternatively, you may define index via data- attribute
				var clickedGallery = clickedListItem.parentNode,
					childNodes = clickedListItem.parentNode.childNodes,
					numChildNodes = childNodes.length,
					nodeIndex = 0,
					index;

				for (var i = 0; i < numChildNodes; i++) {
					if(childNodes[i].nodeType !== 1) {
						continue;
					}

					if(childNodes[i] === clickedListItem) {
						index = nodeIndex;
						break;
					}
					nodeIndex++;
				}



				if(index >= 0) {
						// open PhotoSwipe if valid index found
					index = clickedListItem.getAttribute('data-pswp-uid') - 1;
					openPhotoSwipe( index, clickedGallery );
				}
				return false;
			};

			// parse picture index and gallery index from URL (#&pid=1&gid=2)
			var photoswipeParseHash = function() {
				var hash = window.location.hash.substring(1),
				params = {};

				if(hash.length < 5) {
					return params;
				}

				var vars = hash.split('&');
				for (var i = 0; i < vars.length; i++) {
					if(!vars[i]) {
						continue;
					}
					var pair = vars[i].split('=');
					if(pair.length < 2) {
						continue;
					}
					params[pair[0]] = pair[1];
				}

				if(params.gid) {
					params.gid = parseInt(params.gid, 10);
				}

				if(!params.hasOwnProperty('pid')) {
					return params;
				}
				params.pid = parseInt(params.pid, 10);
				return params;
			};

			var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
				var pswpElement = document.querySelectorAll('.pswp')[0],
					gallery,
					options,
					items;

				items = parseThumbnailElements(document.querySelectorAll( gallerySelector )[0].getElementsByTagName("li"));

				// define options (if needed)
				options = {
					index: index,

					// define gallery index (for URL)
					galleryUID: galleryElement.getAttribute('data-pswp-uid'),

					getThumbBoundsFn: function(index) {
						// See Options -> getThumbBoundsFn section of documentation for more info
						var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
							pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
							rect = thumbnail.getBoundingClientRect();

						return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
					}
				};

				if(disableAnimation) {
					options.showAnimationDuration = 0;
				}

				// Pass data to PhotoSwipe and initialize it
				gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
				gallery.init();
			};

			var galleryElements = document.querySelectorAll( gallerySelector )[0].getElementsByTagName("li");

			// loop through all gallery elements and bind events
			for(var i = 0, l = galleryElements.length; i < l; i++) {
				galleryElements[i].getElementsByTagName('figure')[0].setAttribute('data-pswp-uid', i+1);
				galleryElements[i].getElementsByTagName('figure')[0].onclick = onThumbnailsClick;
			}
			for(var i = 0, l = galleryElements.length; i < l; i++) {
				var width = galleryElements[i].getElementsByTagName('figure')[0].children[0].children[0].naturalWidth;
				var height = galleryElements[i].getElementsByTagName('figure')[0].children[0].children[0].naturalHeight;
				$('#'+galleryElements[i].getElementsByTagName('figure')[0].children[0].children[0].id).parent().attr("data-size", width + 'x' + height);
			}

			// Parse URL and open gallery if it contains #&pid=3&gid=1
			var hashData = photoswipeParseHash();
			if(hashData.pid > 0 && hashData.gid > 0) {
				openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
			}
		};

		// execute above function
		initPhotoSwipeFromDOM('.rslides');

		MapData.mapData().success(handleSuccess);

		$scope.bibliographicReference = function(autor, documento_titulo, fecha, lugar_publicacion) {
			var text = autor;
			if(fecha != "") {
				text = text + " (" + fecha + ") ";
			}
			text = text + documento_titulo + " " + lugar_publicacion;
			return text;
		}; */

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		MapData.mapData().success(handleSuccess);
		$scope.$apply();
	}];
});
