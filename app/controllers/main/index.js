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
					url: appConfigVars.backendURL+'/index.php/api/fichasresumenparamo?page=1&order=scientificname&orderdirection=asc&priorityimages',
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						//callback(null, JSON.parse(body.replace(/^\s+|\s+$/g, '')));
						callback(null, body);
					} else {
						res.send(body);
					}
				});
			},
			initialRecordsSpeciesDataRandomWithImages: function(callback) {
				request({
					url: appConfigVars.backendURL+'/index.php/api/fichas/previewrandomspeciesparamo',
					method: 'GET',
					json: true
				}, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						//callback(null, JSON.parse(body.replace(/^\s+|\s+$/g, '')));
						callback(null, body);
					} else {
						res.send(body);
					}
				});
			}
		}, function(err, result) {
			if(err)
				res.send(handleError(err));
			res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 4 days
			res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
			console.log(typeof result.initialRecordsSpeciesDataRandomWithImages);
			res.render('index', { data: JSON.stringify(result.initialRecordsSpeciesData), dataRandom: JSON.stringify(result.initialRecordsSpeciesDataRandomWithImages) } );
		}
	);
};

exports.redirectAdministrationUrl = function(req, res) {
	res.redirect('http://www.biodiversidad.co:3000');
};

exports.showAllSpecies = function(req, res) {
	async.parallel(
		{
			fullListRecords: function(callback) {
				request({
					url: appConfigVars.backendURL+'/index.php/api/list/species',
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
			res.render('showlistspecies', { data: result.fullListRecords } );
		}
	);
}

exports.showAllSpeciesSimple = function(req, res) {
  res.render('showlistspeciessimple');
}

exports.test = function(req, res) {
	res.render('index');
};

exports.partials = function(req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};
