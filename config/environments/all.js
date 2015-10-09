var express = require('express');
var compress = require('compression');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon')
  , path = require('path');

module.exports = function(parent) {
	parent.set('port', process.env.PORT || appConfigVars.port);
	parent.set('view engine', 'jade');
	parent.set('jsonp callback', true );
	parent.use(compress());
	parent.use(favicon(__dirname + '/../../public/invasoras/images/favicon.ico'));
	parent.use(morgan('dev'));
	parent.use(bodyParser());
	parent.use(methodOverride());
	parent.use(require('stylus').middleware(__dirname + '/../../public'));

	var env = process.env.NODE_ENV || 'development';

	// Load configuration according to environment
	console.log("Current node environment:");
	console.log(process.env.NODE_ENV);
	if(process.env.NODE_ENV == 'development') {
		require('./development')(parent);
	} else if(process.env.NODE_ENV == 'production') {
		require('./production')(parent);
	} else {
		require('./development')(parent);
	}

	// load controllers
	require('./../routers')(parent, { verbose: true });

	logger.info("Catalog front end initial configuration loaded.");
};
