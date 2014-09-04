/**
 * Module dependencies.
 */

var async = require('async');
var request = require('request');

exports.show = function(req, res) {
	var registerID = req.params._id;
	async.parallel(
		{
			registerData: function(callback) {
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
			}
		}, function(err, result) {
			if(err)
				res.send(handleError(err));
			//res.render('index', { title: 'Explorador - Portal de datos SIB Colombia', totalOccurrences: result.totalOccurrences, totalGeoOccurrences: result.totalGeoOccurrences/*, data: JSON.stringify(result.data*/) });
			var metaTagOgImage;
			//result = JSON.parse(result.registerData.replace(/^\s+|\s+$/g, ''));
			result = result.registerData;
			if (typeof result[registerID].atributos != "undefined" && typeof result[registerID].atributos.imagenThumb270 != "undefined") {
        result[registerID].currentImages = result[registerID].atributos.imagenThumb270;
				metaTagOgImage = result[registerID].atributos.imagenThumb270[0];
			} else if (typeof result[registerID].atributos != "undefined" && typeof result[registerID].atributos.imagenThumb140 != "undefined") {
        result[registerID].currentImages = result[registerID].atributos.imagenThumb140;
				metaTagOgImage = result[registerID].atributos.imagenThumb140[0];
			} else {
				if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "aves") {
          result[registerID].currentImage = "/images/taxon_icons/aves.png";
					metaTagOgImage = "/images/taxon_icons/aves.png";
				} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "reptilia") {
          result[registerID].currentImage = "/images/taxon_icons/reptiles.png";
					metaTagOgImage = "/images/taxon_icons/reptiles.png";
				} else if(result[registerID].reino.toLowerCase() == "animalia" && (result[registerID].clase.toLowerCase() == "mammalia" || result[registerID].clase.toLowerCase() == "mamalia")) {
          result[registerID].currentImage = "/images/taxon_icons/mamiferos.png";
					metaTagOgImage = "/images/taxon_icons/mamiferos.png";
				} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "insecta") {
          result[registerID].currentImage = "/images/taxon_icons/insectos.png";
					metaTagOgImage = "/images/taxon_icons/insectos.png";
				} else if(result[registerID].reino.toLowerCase() == "plantae") {
          result[registerID].currentImage = "/images/taxon_icons/plantas.png";
					metaTagOgImage = "/images/taxon_icons/plantas.png";
				} else if(result[registerID].reino.toLowerCase() == "fungi") {
          result[registerID].currentImage = "/images/taxon_icons/hongos.png";
					metaTagOgImage = "/images/taxon_icons/hongos.png";
				} else if(result[registerID].reino.toLowerCase() == "animalia" && result[registerID].clase.toLowerCase() == "amphibia") {
          result[registerID].currentImage = "/images/taxon_icons/anfibios.png";
					metaTagOgImage = "/images/taxon_icons/anfibios.png";
				} else {
          result[registerID].currentImage = "/images/taxon_icons/vida.png";
					metaTagOgImage = "/images/taxon_icons/vida.png";
				}
			}
			res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 4 days
			res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
      res.render('show', { data: result[registerID], data2: JSON.stringify(result[registerID]), metaImageOg: metaTagOgImage, registerURL: "http://www.biodiversidad.co/ficha/id/"+registerID, ogTitle: result[registerID].info_taxonomica.taxonnombre } );
		}
	);
};
