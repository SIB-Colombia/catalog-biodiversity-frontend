define(['jquery', 'angular'], function($, angular) {
	'use strict';
        
	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('catalogFrontend.services', []).value('version', '0.1');

	// Factory for loading initial data and get nextPage of infiniteScroll
	angular.module('catalogFrontend.factories', [])
		.factory('Catalogue', ['$http', function ($http) {
			var Catalogue = function() {
				this.species = [];
				this.totalregisters = dataVar.total_fichas;
				for(var i in dataVar.data) {
					if (typeof dataVar.data[i].imagenes.imagenThumb270 != "undefined") {
						dataVar.data[i]["currentImage"] = dataVar.data[i].imagenes.imagenThumb270[Math.floor(Math.random()*dataVar.data[i].imagenes.imagenThumb270.length)];
					} else if (typeof dataVar.data[i].imagenes.imagenThumb140 != "undefined") {
						dataVar.data[i]["currentImage"] = dataVar.data[i].imagenes.imagenThumb140[Math.floor(Math.random()*dataVar.data[i].imagenes.imagenThumb140.length)];
					}
					this.species.push(dataVar.data[i]);
				}
				this.busy = false;
				this.end = false;
				this.page = 2;
			};

			Catalogue.prototype.nextPage = function() {
				var self = this;
				if (this.end) return;
				if (this.busy) return;
				this.busy = true;

				var url = 'http://www.biodiversidad.co/index.php/api/fichasresumen?page='+this.page+'&onlyimages=true&jsonp=JSON_CALLBACK';
				$http.jsonp(url).success(function(data) {
					var items = data.data;
					for (var i = 0; i < items.length; i++) {
						if (typeof items[i].imagenes.imagenThumb270 != "undefined") {
							items[i]["currentImage"] = items[i].imagenes.imagenThumb270[Math.floor(Math.random()*items[i].imagenes.imagenThumb270.length)];
						} else if (typeof items[i].imagenes.imagenThumb140 != "undefined") {
							items[i]["currentImage"] = items[i].imagenes.imagenThumb140[Math.floor(Math.random()*items[i].imagenes.imagenThumb140.length)];
						}
						this.species.push(items[i]);
					}
					this.busy = false;
					this.page++;
					setTimeout(function() {
						$("#isotopeContainer").isotope('reLayout');
					}, 8000);
					if(this.species.length == this.totalregisters) {
						this.end = true;
					}
				}.bind(this));

			};

			return Catalogue;
		}])
		.factory('Record', ['$http', function ($http) {
			var Record = function() {
				this.data = recordOfSpecie;
				if (typeof this.data.atributos.imagenThumb270 != "undefined") {
					this.data.currentImages = this.data.atributos.imagenThumb270;
				} else if (typeof this.data.atributos.imagenThumb140 != "undefined") {
					this.data.currentImages = this.data.atributos.imagenThumb140;
				}
			};

			return Record;
		}]);

});