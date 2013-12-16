/**
 * Module dependencies.
 */

var async = require('async');
var request = require('request');

exports.index = function(req, res) {
	async.parallel(
		{
			initialRecordsSpeciesData: function(callback) {
				request({
					url: appConfigVars.backendURL+'/index.php/api/fichasresumen?page=1&onlyimages=true',
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
			res.render('index', { data: JSON.stringify(result.initialRecordsSpeciesData) } );
		}
	);
};

exports.test = function(req, res) {
	res.render('index');
};

exports.partials = function(req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};