var express = require('express')
  , path = require('path')
  , winston = require('winston');

module.exports = function(parent) {
	parent.use(express.static(path.join(__dirname, '/../../public'), { maxAge: oneMonth }));
	
	logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({ level: 'error' }),
			new (winston.transports.File)({ filename: 'logs/catalog_frontend.log' })
		]
	});

	var redirect = express();

	redirect.all('*', function(req, res) {
		console.log(req.subdomains);
		res.redirect('http://administracion.biodiversidad.co:3000/' + req-subdomains[0]);
	});

	parent.use(express.vhost('administracion.biodiversidad.co', redirect));
};