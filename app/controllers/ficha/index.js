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
			res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 4 days
			res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
			res.render('show', { data: JSON.stringify(result.registerData[registerID]) } );
		}
	);
};