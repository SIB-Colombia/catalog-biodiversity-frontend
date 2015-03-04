/**
 * Module dependencies.
 */

var async = require('async');
var request = require('request');

exports.show = function(req, res) {
	var registerID = req.params._id;
	async.waterfall([
			function(callback) {
				request({
					url: appConfigVars.backendURL+'/index.php/api/ficha/'+registerID,
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						callback(null, body);
					} else {
						res.send(body);
					}
				});
			},
			function(arg1, callback) {
				result = JSON.parse(arg1.replace(/^\s+|\s+$/g, ''));
				request({
					url: appConfigVars.backendURL+'/index.php/api/external_images?taxon_nombre='+encodeURIComponent(result[registerID].info_taxonomica.taxonnombre),
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						if(body.length > 0) {
							result[registerID].currentImages = [];
							for (i = 0; i < body.length; i++) {
								result[registerID].currentImages[i] = {};
								result[registerID].currentImages[i].imageURL = body[i].imageurl;
								result[registerID].currentImages[i].imageLicense = body[i].imagelicense;
								result[registerID].currentImages[i].imageRights = body[i].imagerights;
								result[registerID].currentImages[i].imageSource = body[i].imagesource;
								result[registerID].currentImages[i].imageRightsHolder = body[i].imagerightsholder;
								result[registerID].currentImages[i].imageExternal = true;
							}
						}
						callback(null, result);
					} else {
						callback(null, result);
					}
				});
			}
		], function(err, result) {
			if(err)
				res.send(err);
			//res.render('index', { title: 'Explorador - Portal de datos SIB Colombia', totalOccurrences: result.totalOccurrences, totalGeoOccurrences: result.totalGeoOccurrences/*, data: JSON.stringify(result.data*/) });
			var metaTagOgImage;
			//result = JSON.parse(result.replace(/^\s+|\s+$/g, ''));
			if(typeof result[registerID].currentImages == "undefined") {
				result[registerID].currentImages = [];	
			}
			if (typeof result[registerID].atributos != "undefined" && typeof result[registerID].atributos.imagenThumb270 != "undefined") {
				for( var i = 0; i < result[registerID].atributos.imagenThumb270.length; i++) {
					result[registerID].currentImages[result[registerID].currentImages.length] = {};
					result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = result[registerID].atributos.imagenThumb270[i];	
				}
        //result[registerID].currentImages = result[registerID].atributos.imagenThumb270;
				//metaTagOgImage = result[registerID].atributos.imagenThumb270[0];
			} else if (typeof result[registerID].atributos != "undefined" && typeof result[registerID].atributos.imagenThumb140 != "undefined") {
				for( var i = 0; i < result[registerID].atributos.imagenThumb140.length; i++) {
					result[registerID].currentImages[result[registerID].currentImages.length] = {};
					result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = result[registerID].atributos.imagenThumb140[i];	
				}
        //result[registerID].currentImages = result[registerID].atributos.imagenThumb140;
				//metaTagOgImage = result[registerID].atributos.imagenThumb140[0];
			} else {
				if(typeof result[registerID].reino != "undefined") {
					if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "aves") {
	          			result[registerID].currentImage = "/images/taxon_icons/aves.png";
						//metaTagOgImage = "/images/taxon_icons/aves.png";
					} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "reptilia") {
						result[registerID].currentImage = "/images/taxon_icons/reptiles.png";
						//metaTagOgImage = "/images/taxon_icons/reptiles.png";
					} else if(result[registerID].reino.toLowerCase() == "animalia" && (result[registerID].clase.toLowerCase() == "mammalia" || result[registerID].clase.toLowerCase() == "mamalia")) {
						result[registerID].currentImage = "/images/taxon_icons/mamiferos-retina.png";
						//metaTagOgImage = "/images/taxon_icons/mamiferos.png";
					} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "insecta") {
						result[registerID].currentImage = "/images/taxon_icons/insectos.png";
						//metaTagOgImage = "/images/taxon_icons/insectos.png";
					} else if(result[registerID].reino.toLowerCase() == "plantae") {
						result[registerID].currentImage = "/images/taxon_icons/plantas.png";
						//metaTagOgImage = "/images/taxon_icons/plantas.png";
					} else if(result[registerID].reino.toLowerCase() == "fungi") {
						result[registerID].currentImage = "/images/taxon_icons/hongos.png";
						//metaTagOgImage = "/images/taxon_icons/hongos.png";
					} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "amphibia") {
						result[registerID].currentImage = "/images/taxon_icons/anfibios.png";
						//metaTagOgImage = "/images/taxon_icons/anfibios.png";
					} else {
						result[registerID].currentImage = "/images/taxon_icons/vida.png";
						//metaTagOgImage = "/images/taxon_icons/vida.png";
					}
				}
			}
			res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 4 days
			res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
      res.render('show', { data: result[registerID], data2: JSON.stringify(result[registerID]), metaImageOg: metaTagOgImage, registerURL: "http://www.biodiversidad.co/ficha/id/"+registerID, ogTitle: result[registerID].info_taxonomica.taxonnombre } );
		}
	);
};

exports.showOld = function(req, res) {
	var registerID = req.params._id;
	async.waterfall([
			function(callback) {
				request({
					url: appConfigVars.backendURL+'/index.php/api/ficha/'+registerID,
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						callback(null, body);
					} else {
						res.send(body);
					}
				});
			},
			function(arg1, callback) {
				result = JSON.parse(arg1.replace(/^\s+|\s+$/g, ''));
				request({
					url: "http://eol.org/api/search/1.0.json?q="+encodeURIComponent(result[registerID].info_taxonomica.taxonnombre)+"&page=1&exact=true&filter_by_taxon_concept_id=&filter_by_hierarchy_entry_id=&filter_by_string=&cache_ttl=",
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						if(body.totalResults > 0) {
							callback(null, result, body.results[0].id);	
						} else {
							callback(null, result, -1);
						}
					} else {
						callback(null, result, -1);
					}
				});
			},
			function(result, eolID, callback) {
				request({
					url: "http://eol.org/api/pages/1.0/"+eolID+".json?images=10&videos=0&sounds=0&maps=0&text=0&iucn=false&subjects=overview&licenses=all&details=true&common_names=false&synonyms=false&references=false&vetted=0&cache_ttl=",
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						if(body.dataObjects.length > 0) {
							result[registerID].currentImages = [];
							for (i = 0; i < body.length; i++) {
								result[registerID].currentImages[i] = {};
								result[registerID].currentImages[i].imageURL = body[i].imageurl;
								result[registerID].currentImages[i].imageLicense = body[i].imagelicense;
								result[registerID].currentImages[i].imageRights = body[i].imagerights;
								result[registerID].currentImages[i].imageSource = body[i].imagesource;
								result[registerID].currentImages[i].imageRightsHolder = body[i].imagerightsholder;
								result[registerID].currentImages[i].imageExternal = true;
							}
						}
						callback(null, result);
					} else {
						callback(null, result);
					}
				});
			}
		], function(err, result) {
			if(err)
				res.send(err);
			//res.render('index', { title: 'Explorador - Portal de datos SIB Colombia', totalOccurrences: result.totalOccurrences, totalGeoOccurrences: result.totalGeoOccurrences/*, data: JSON.stringify(result.data*/) });
			var metaTagOgImage;
			//result = JSON.parse(result.replace(/^\s+|\s+$/g, ''));
			if(typeof result[registerID].currentImages == "undefined") {
				result[registerID].currentImages = [];
				console.log(result[registerID].currentImages.length);
			}
			if (typeof result[registerID].atributos != "undefined" && typeof result[registerID].atributos.imagenThumb270 != "undefined") {
				for( var i = 0; i < result[registerID].atributos.imagenThumb270.length; i++) {
					result[registerID].currentImages[result[registerID].currentImages.length] = {};
					result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = result[registerID].atributos.imagenThumb270[i];	
				}
        //result[registerID].currentImages = result[registerID].atributos.imagenThumb270;
				//metaTagOgImage = result[registerID].atributos.imagenThumb270[0];
			} else if (typeof result[registerID].atributos != "undefined" && typeof result[registerID].atributos.imagenThumb140 != "undefined") {
				for( var i = 0; i < result[registerID].atributos.imagenThumb140.length; i++) {
					result[registerID].currentImages[result[registerID].currentImages.length] = {};
					result[registerID].currentImages[result[registerID].currentImages.length-1].imageURL = result[registerID].atributos.imagenThumb140[i];	
				}
        //result[registerID].currentImages = result[registerID].atributos.imagenThumb140;
				//metaTagOgImage = result[registerID].atributos.imagenThumb140[0];
			} else {
				if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "aves") {
          			result[registerID].currentImage = "/images/taxon_icons/aves.png";
					//metaTagOgImage = "/images/taxon_icons/aves.png";
				} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "reptilia") {
          			result[registerID].currentImage = "/images/taxon_icons/reptiles.png";
					//metaTagOgImage = "/images/taxon_icons/reptiles.png";
				} else if(result[registerID].reino.toLowerCase() == "animalia" && (result[registerID].clase.toLowerCase() == "mammalia" || result[registerID].clase.toLowerCase() == "mamalia")) {
          			result[registerID].currentImage = "/images/taxon_icons/mamiferos.png";
					//metaTagOgImage = "/images/taxon_icons/mamiferos.png";
				} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "insecta") {
          			result[registerID].currentImage = "/images/taxon_icons/insectos.png";
					//metaTagOgImage = "/images/taxon_icons/insectos.png";
				} else if(result[registerID].reino.toLowerCase() == "plantae") {
          			result[registerID].currentImage = "/images/taxon_icons/plantas.png";
					//metaTagOgImage = "/images/taxon_icons/plantas.png";
				} else if(result[registerID].reino.toLowerCase() == "fungi") {
          			result[registerID].currentImage = "/images/taxon_icons/hongos.png";
					//metaTagOgImage = "/images/taxon_icons/hongos.png";
				} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "amphibia") {
          			result[registerID].currentImage = "/images/taxon_icons/anfibios.png";
					//metaTagOgImage = "/images/taxon_icons/anfibios.png";
				} else {
          			result[registerID].currentImage = "/images/taxon_icons/vida.png";
					//metaTagOgImage = "/images/taxon_icons/vida.png";
				}
			}
			res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 4 days
			res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
      res.render('show', { data: result[registerID], data2: JSON.stringify(result[registerID]), metaImageOg: metaTagOgImage, registerURL: "http://www.biodiversidad.co/ficha/id/"+registerID, ogTitle: result[registerID].info_taxonomica.taxonnombre } );
		}
	);
};
