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
			if (typeof result.registerData[registerID].atributos != "undefined" && typeof result.registerData[registerID].atributos.imagenThumb270 != "undefined") {
        result.registerData[registerID].currentImages = result.registerData[registerID].atributos.imagenThumb270;
				metaTagOgImage = result.registerData[registerID].atributos.imagenThumb270[0];
			} else if (typeof result.registerData[registerID].atributos != "undefined" && typeof result.registerData[registerID].atributos.imagenThumb140 != "undefined") {
        result.registerData[registerID].currentImages = result.registerData[registerID].atributos.imagenThumb140;
				metaTagOgImage = result.registerData[registerID].atributos.imagenThumb140[0];
			} else {
				if(result.registerData[registerID].reino.toLowerCase() == "animalia" && result.registerData[registerID].clase.toLowerCase() == "aves") {
          result.registerData[registerID].currentImage = "/images/taxon_icons/aves.png";
					metaTagOgImage = "/images/taxon_icons/aves.png";
				} else if(result.registerData[registerID].reino.toLowerCase() == "animalia" && result.registerData[registerID].clase.toLowerCase() == "reptilia") {
          result.registerData[registerID].currentImage = "/images/taxon_icons/reptiles.png";
					metaTagOgImage = "/images/taxon_icons/reptiles.png";
				} else if(result.registerData[registerID].reino.toLowerCase() == "animalia" && (result.registerData[registerID].clase.toLowerCase() == "mammalia" || result.registerData[registerID].clase.toLowerCase() == "mamalia")) {
          result.registerData[registerID].currentImage = "/images/taxon_icons/mamiferos.png";
					metaTagOgImage = "/images/taxon_icons/mamiferos.png";
				} else if(result.registerData[registerID].reino.toLowerCase() == "animalia" && result.registerData[registerID].clase.toLowerCase() == "insecta") {
          result.registerData[registerID].currentImage = "/images/taxon_icons/insectos.png";
					metaTagOgImage = "/images/taxon_icons/insectos.png";
				} else if(result.registerData[registerID].reino.toLowerCase() == "plantae") {
          result.registerData[registerID].currentImage = "/images/taxon_icons/plantas.png";
					metaTagOgImage = "/images/taxon_icons/plantas.png";
				} else if(result.registerData[registerID].reino.toLowerCase() == "fungi") {
          result.registerData[registerID].currentImage = "/images/taxon_icons/hongos.png";
					metaTagOgImage = "/images/taxon_icons/hongos.png";
				} else if(result.registerData[registerID].reino.toLowerCase() == "animalia" && result.registerData[registerID].clase.toLowerCase() == "amphibia") {
          result.registerData[registerID].currentImage = "/images/taxon_icons/anfibios.png";
					metaTagOgImage = "/images/taxon_icons/anfibios.png";
				} else {
          result.registerData[registerID].currentImage = "/images/taxon_icons/vida.png";
					metaTagOgImage = "/images/taxon_icons/vida.png";
				}
			}
			res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 4 days
			res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
      res.render('show', { data: result.registerData[registerID], data2: JSON.stringify(result.registerData[registerID]), metaImageOg: metaTagOgImage, registerURL: "http://www.biodiversidad.co/ficha/id/"+registerID, ogTitle: result.registerData[registerID].info_taxonomica.taxonnombre } );
		}
	);
};
