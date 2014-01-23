var express = require('express')
  , path = require('path')
  , winston = require('winston');

module.exports = function(parent) {
	parent.use(function(req, res, next){
		res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 4 days
		res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
		next();
	});
	parent.use(express.static(path.join(__dirname, '/../../public')));
	
	logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({ level: 'error' }),
			new (winston.transports.File)({ filename: 'logs/catalog_frontend.log' })
		]
	});

	/*var redirect = express();

	redirect.all('*', function(req, res) {
		console.log(req.subdomains);
		res.redirect('http://www.biodiversidad.co:3000/' + req-subdomains[0]);
	});

	parent.use(express.vhost('http://www.biodiversidad.co/admin', redirect));*/
};