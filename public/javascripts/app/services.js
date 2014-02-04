define(['jquery', 'angular'], function($, angular) {
	'use strict';
        
	/* Services */

	angular.module('catalogFrontend.services', []).value('version', '0.1');

	// Factory for loading initial data and get nextPage of infiniteScroll
	angular.module('catalogFrontend.factories', [])
		.factory('Catalogue', ['$http', function ($http) {
			var Catalogue = function(searchOptions) {
				$("nav .notFound").addClass("occult-element");
				this.species = [];
				if(searchOptions.getCurrentTaxon() == 'all' && searchOptions.getCurrentURL() == '/') {
					this.totalregisters = dataVar.total_fichas;
					for(var i in dataVarRandomImages.data) {
						if (typeof dataVarRandomImages.data[i].imagenes.imagenThumb270 != "undefined") {
							dataVarRandomImages.data[i]["currentImage"] = dataVarRandomImages.data[i].imagenes.imagenThumb270[Math.floor(Math.random()*dataVarRandomImages.data[i].imagenes.imagenThumb270.length)];
						} else if (typeof dataVarRandomImages.data[i].imagenes.imagenThumb140 != "undefined") {
							dataVarRandomImages.data[i]["currentImage"] = dataVarRandomImages.data[i].imagenes.imagenThumb140[Math.floor(Math.random()*dataVarRandomImages.data[i].imagenes.imagenThumb140.length)];
						} else {
							if(dataVarRandomImages.data[i].reino.toLowerCase() == "animalia" && dataVarRandomImages.data[i].clase.toLowerCase() == "aves") {
								dataVarRandomImages.data[i]["currentImage"] = "/images/taxon_icons/aves2.png";
							} else if(dataVarRandomImages.data[i].reino.toLowerCase() == "animalia" && dataVarRandomImages.data[i].clase.toLowerCase() == "reptilia") {
								dataVarRandomImages.data[i]["currentImage"] = "/images/taxon_icons/reptiles2.png";
							} else if(dataVarRandomImages.data[i].reino.toLowerCase() == "animalia" && (dataVarRandomImages.data[i].clase.toLowerCase() == "mammalia" || dataVarRandomImages.data[i].clase.toLowerCase() == "mamalia")) {
								dataVarRandomImages.data[i]["currentImage"] = "/images/taxon_icons/mamiferos2.png";
							} else if(dataVarRandomImages.data[i].reino.toLowerCase() == "animalia" && dataVarRandomImages.data[i].clase.toLowerCase() == "insecta") {
								dataVarRandomImages.data[i]["currentImage"] = "/images/taxon_icons/insectos2.png";
							} else if(dataVarRandomImages.data[i].reino.toLowerCase() == "plantae") {
								dataVarRandomImages.data[i]["currentImage"] = "/images/taxon_icons/plantas2.png";
							} else if(dataVarRandomImages.data[i].reino.toLowerCase() == "fungi") {
								dataVarRandomImages.data[i]["currentImage"] = "/images/taxon_icons/hongos2.png";
							} else if(dataVarRandomImages.data[i].reino.toLowerCase() == "animalia" && dataVarRandomImages.data[i].clase.toLowerCase() == "amphibia") {
								dataVarRandomImages.data[i]["currentImage"] = "/images/taxon_icons/anfibios2.png";
							} else {
								dataVarRandomImages.data[i]["currentImage"] = "/images/taxon_icons/vida_s.png";
							}
						}
						this.species.push(dataVarRandomImages.data[i]);
					}
					for(var i in dataVar.data) {
						if (typeof dataVar.data[i].imagenes.imagenThumb270 != "undefined") {
							dataVar.data[i]["currentImage"] = dataVar.data[i].imagenes.imagenThumb270[Math.floor(Math.random()*dataVar.data[i].imagenes.imagenThumb270.length)];
						} else if (typeof dataVar.data[i].imagenes.imagenThumb140 != "undefined") {
							dataVar.data[i]["currentImage"] = dataVar.data[i].imagenes.imagenThumb140[Math.floor(Math.random()*dataVar.data[i].imagenes.imagenThumb140.length)];
						} else {
							if(dataVar.data[i].reino.toLowerCase() == "animalia" && dataVar.data[i].clase.toLowerCase() == "aves") {
								dataVar.data[i]["currentImage"] = "/images/taxon_icons/aves2.png";
							} else if(dataVar.data[i].reino.toLowerCase() == "animalia" && dataVar.data[i].clase.toLowerCase() == "reptilia") {
								dataVar.data[i]["currentImage"] = "/images/taxon_icons/reptiles2.png";
							} else if(dataVar.data[i].reino.toLowerCase() == "animalia" && (dataVar.data[i].clase.toLowerCase() == "mammalia" || dataVar.data[i].clase.toLowerCase() == "mamalia")) {
								dataVar.data[i]["currentImage"] = "/images/taxon_icons/mamiferos2.png";
							} else if(dataVar.data[i].reino.toLowerCase() == "animalia" && dataVar.data[i].clase.toLowerCase() == "insecta") {
								dataVar.data[i]["currentImage"] = "/images/taxon_icons/insectos2.png";
							} else if(dataVar.data[i].reino.toLowerCase() == "plantae") {
								dataVar.data[i]["currentImage"] = "/images/taxon_icons/plantas2.png";
							} else if(dataVar.data[i].reino.toLowerCase() == "fungi") {
								dataVar.data[i]["currentImage"] = "/images/taxon_icons/hongos2.png";
							} else if(dataVar.data[i].reino.toLowerCase() == "animalia" && dataVar.data[i].clase.toLowerCase() == "amphibia") {
								dataVar.data[i]["currentImage"] = "/images/taxon_icons/anfibios2.png";
							} else {
								items[i]["currentImage"] = "/images/taxon_icons/vida_s.png";
							}
						}
						this.species.push(dataVar.data[i]);
					}
					setTimeout(function() {
						$("#isotopeContainer").isotope('reLayout');
					}, 1000);
					setTimeout(function() {
						$("#isotopeContainer").isotope('reLayout');
					}, 3000);
				} else {
					var url = 'http://www.biodiversidad.co:3000/index.php/api/fichasresumen?page=1';
					if(searchOptions.getCurrentTaxon() != 'all') {
						url += '&taxon='+searchOptions.getCurrentTaxon();
					}
					if(searchOptions.getShowRecordsWithPicture() == true) {
						url += '&priorityimages';
					}
					if(searchOptions.getOrderDirection() == 'desc') {
						url += '&orderdirection=desc';
					} else {
						url += '&orderdirection=asc';
					}
					if(searchOptions.getSearchCondition() != "") {
						url += '&query='+searchOptions.getSearchCondition();
					}
					url += '&order=scientificname&jsonp=JSON_CALLBACK';
					$("#wall-container-wrapper").addClass("loading2");
					$http.jsonp(url).success(function(data) {
						if(data != 'No items where found') {
							var items = data.data;
							this.totalregisters = data.total_fichas;
							for (var i = 0; i < items.length; i++) {
								if (typeof items[i].imagenes.imagenThumb270 != "undefined") {
									items[i]["currentImage"] = items[i].imagenes.imagenThumb270[Math.floor(Math.random()*items[i].imagenes.imagenThumb270.length)];
								} else if (typeof items[i].imagenes.imagenThumb140 != "undefined") {
									items[i]["currentImage"] = items[i].imagenes.imagenThumb140[Math.floor(Math.random()*items[i].imagenes.imagenThumb140.length)];
								} else {
									if(typeof items[i].reino != 'undefined' && typeof items[i].clase != 'undefined') {
										if(items[i].reino.toLowerCase() == "animalia" && items[i].clase.toLowerCase() == "aves") {
											items[i]["currentImage"] = "/images/taxon_icons/aves2.png";
										} else if(items[i].reino.toLowerCase() == "animalia" && items[i].clase.toLowerCase() == "reptilia") {
											items[i]["currentImage"] = "/images/taxon_icons/reptiles2.png";
										} else if(items[i].reino.toLowerCase() == "animalia" && (items[i].clase.toLowerCase() == "mammalia" || items[i].clase.toLowerCase() == "mamalia")) {
											items[i]["currentImage"] = "/images/taxon_icons/mamiferos2.png";
										} else if(items[i].reino.toLowerCase() == "animalia" && items[i].clase.toLowerCase() == "insecta") {
											items[i]["currentImage"] = "/images/taxon_icons/insectos2.png";
										} else if(items[i].reino.toLowerCase() == "plantae") {
											items[i]["currentImage"] = "/images/taxon_icons/plantas2.png";
										} else if(items[i].reino.toLowerCase() == "fungi") {
											items[i]["currentImage"] = "/images/taxon_icons/hongos2.png";
										} else if(items[i].reino.toLowerCase() == "animalia" && items[i].clase.toLowerCase() == "amphibia") {
											items[i]["currentImage"] = "/images/taxon_icons/anfibios2.png";
										} else {
											items[i]["currentImage"] = "/images/taxon_icons/vida_s.png";
										}
									} else {
										items[i]["currentImage"] = "/images/taxon_icons/vida_s.png";
									}
								}
								this.species.push(items[i]);
							}
							$("#wall-container-wrapper").removeClass("loading2");
							setTimeout(function() {
								$("#isotopeContainer").isotope('reLayout');
							}, 1000);
							setTimeout(function() {
								$("#isotopeContainer").isotope('reLayout');
							}, 3000);
							this.end = false;
							if(this.species.length == this.totalregisters) {
								this.end = true;
							}
						} else {
							$("#wall-container-wrapper").removeClass("loading2");
							$("nav .notFound").removeClass("occult-element");
							this.end = true;
						}
					}.bind(this));
				}
				this.busy = false;
				this.page = 2;
				this.taxonType = searchOptions.getCurrentTaxon();
				this.showWithPriorityPicture = searchOptions.getShowRecordsWithPicture();
				this.orderDirection = searchOptions.getOrderDirection();
				this.searchCondition = searchOptions.getSearchCondition();
			};

			Catalogue.prototype.nextPage = function() {
				var self = this;
				if (this.end) return;
				if (this.busy) return;
				this.busy = true;
				var url="";

				url = 'http://www.biodiversidad.co:3000/index.php/api/fichasresumen?page='+this.page;
				if(this.taxonType != 'all') {
					url += '&taxon='+this.taxonType+'&order=scientificname';
				} else {
					url += '&order=scientificname';
				}
				if(this.showWithPriorityPicture == true) {
					url += '&priorityimages';
				}
				if(this.orderDirection == 'desc') {
					url += '&orderdirection=desc';
				} else {
					url += '&orderdirection=asc';
				}
				if(this.searchCondition != "") {
					url += '&query='+this.searchCondition;
				}
				url += '&jsonp=JSON_CALLBACK';
				$http.jsonp(url).success(function(data) {
					var items = data.data;
					for (var i = 0; i < items.length; i++) {
						if (typeof items[i].imagenes.imagenThumb270 != "undefined") {
							items[i]["currentImage"] = items[i].imagenes.imagenThumb270[Math.floor(Math.random()*items[i].imagenes.imagenThumb270.length)];
						} else if (typeof items[i].imagenes.imagenThumb140 != "undefined") {
							items[i]["currentImage"] = items[i].imagenes.imagenThumb140[Math.floor(Math.random()*items[i].imagenes.imagenThumb140.length)];
						} else {
							if(items[i].reino.toLowerCase() == "animalia" && items[i].clase.toLowerCase() == "aves") {
								items[i]["currentImage"] = "/images/taxon_icons/aves2.png";
							} else if(items[i].reino.toLowerCase() == "animalia" && items[i].clase.toLowerCase() == "reptilia") {
								items[i]["currentImage"] = "/images/taxon_icons/reptiles2.png";
							} else if(items[i].reino.toLowerCase() == "animalia" && (items[i].clase.toLowerCase() == "mammalia" || items[i].clase.toLowerCase() == "mamalia")) {
								items[i]["currentImage"] = "/images/taxon_icons/mamiferos2.png";
							} else if(items[i].reino.toLowerCase() == "animalia" && items[i].clase.toLowerCase() == "insecta") {
								items[i]["currentImage"] = "/images/taxon_icons/insectos2.png";
							} else if(items[i].reino.toLowerCase() == "plantae") {
								items[i]["currentImage"] = "/images/taxon_icons/plantas2.png";
							} else if(items[i].reino.toLowerCase() == "fungi") {
								items[i]["currentImage"] = "/images/taxon_icons/hongos2.png";
							} else if(items[i].reino.toLowerCase() == "animalia" && items[i].clase.toLowerCase() == "amphibia") {
								items[i]["currentImage"] = "/images/taxon_icons/anfibios2.png";
							} else {
								items[i]["currentImage"] = "/images/taxon_icons/vida_s.png";
							}
						}
						this.species.push(items[i]);
					}
					if(this.species.length == this.totalregisters) {
						this.end = true;
					}
					this.busy = false;
					this.page++;
					setTimeout(function() {
						$("#isotopeContainer").isotope('reLayout');
					}, 8000);
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
				} else {
					if(this.data.reino.toLowerCase() == "animalia" && this.data.clase.toLowerCase() == "aves") {
						this.data.currentImage = "/images/taxon_icons/aves.png";
					} else if(this.data.reino.toLowerCase() == "animalia" && this.data.clase.toLowerCase() == "reptilia") {
						this.data.currentImage = "/images/taxon_icons/reptiles.png";
					} else if(this.data.reino.toLowerCase() == "animalia" && (this.data.clase.toLowerCase() == "mammalia" || this.data.clase.toLowerCase() == "mamalia")) {
						this.data.currentImage = "/images/taxon_icons/mamiferos.png";
					} else if(this.data.reino.toLowerCase() == "animalia" && this.data.clase.toLowerCase() == "insecta") {
						this.data.currentImage = "/images/taxon_icons/insectos.png";
					} else if(this.data.reino.toLowerCase() == "plantae") {
						this.data.currentImage = "/images/taxon_icons/plantas.png";
					} else if(this.data.reino.toLowerCase() == "fungi") {
						this.data.currentImage = "/images/taxon_icons/hongos.png";
					} else if(this.data.reino.toLowerCase() == "animalia" && this.data.clase.toLowerCase() == "amphibia") {
						this.data.currentImage = "/images/taxon_icons/anfibios.png";
					} else {
						this.data.currentImage = "/images/taxon_icons/vida.png";
					}
				}
			};
			return Record;
		}])
		.factory('SearchOptions', ['$http', function ($http) {
			var showRecordsWithPicture = true;
			var currentTaxon = "all";;
			var orderBy = "scientificName";
			var orderDirection = "asc";
			var searchCondition = "";
			var currentLocation = "/";
			
			function getShowRecordsWithPicture() {
				return showRecordsWithPicture;
			};

			function getCurrentTaxon() {
				return currentTaxon;
			};

			function getOrderBy() {
				return orderBy;
			};

			function getOrderDirection() {
				return orderDirection;
			};

			function getSearchCondition() {
				return searchCondition;
			};

			function getCurrentLocation() {
				return currentLocation;
			};

			function getCurrentURL() {
				var url = "";
				url += currentLocation;
				var first = true;
				if(showRecordsWithPicture == false) {
					url += "?priorityImages="+showRecordsWithPicture;
					first = false;
				}
				if(orderDirection == 'desc') {
					if(first == true) {
						url += "?order="+orderDirection;
						first = false;
					} else {
						url += "&order="+orderDirection;
					}
				}
				if(searchCondition != '') {
					if(first == true) {
						url += "?q="+searchCondition;
						first = false;
					} else {
						url += "&q="+searchCondition;
					}	
				}
				return url;
			};

			function getCurrentURLWithoutTaxon() {
				var url = "";
				var first = true;
				if(showRecordsWithPicture == false) {
					url += "?priorityImages="+showRecordsWithPicture;
					first = false;
				}
				if(orderDirection == 'desc') {
					if(first == true) {
						url += "?order="+orderDirection;
						first = false;
					} else {
						url += "&order="+orderDirection;
					}
				}
				if(searchCondition != '') {
					if(first == true) {
						url += "?q="+searchCondition;
						first = false;
					} else {
						url += "&q="+searchCondition;
					}	
				}
				return url;
			};

			function setShowRecordsWithPicture(newShowRecordsWithPicture) {
				showRecordsWithPicture = newShowRecordsWithPicture;
			};

			function setCurrentTaxon(newCurrentTaxon) {
				currentTaxon = newCurrentTaxon;
			};

			function setOrderBy(newOrderBy) {
				orderBy = newOrderBy;
			};

			function setOrderDirection(newOrderDirection) {
				orderDirection = newOrderDirection;
			};

			function setSearchCondition(newSearchCondition) {
				searchCondition = newSearchCondition;
			};

			function setCurrentLocation(newLocation) {
				currentLocation = newLocation;
			};

			//return SearchOptions;
			return {
				getShowRecordsWithPicture: getShowRecordsWithPicture,
				getCurrentTaxon: getCurrentTaxon,
				getOrderBy: getOrderBy,
				getOrderDirection: getOrderDirection,
				getSearchCondition: getSearchCondition,
				getCurrentLocation: getCurrentLocation,
				getCurrentURL: getCurrentURL,
				getCurrentURLWithoutTaxon: getCurrentURLWithoutTaxon,
				setShowRecordsWithPicture: setShowRecordsWithPicture,
				setCurrentTaxon: setCurrentTaxon,
				setOrderBy: setOrderBy,
				setOrderDirection: setOrderDirection,
				setSearchCondition: setSearchCondition,
				setCurrentLocation: setCurrentLocation
			};
		}]);

});