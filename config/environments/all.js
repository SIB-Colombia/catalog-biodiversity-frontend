var express = require('express')
  , path = require('path');

module.exports = function(parent) {
	parent.set('port', process.env.PORT || appConfigVars.port);
	parent.set('view engine', 'jade');
	parent.set('jsonp callback', true );
	parent.use(express.compress());
	parent.use(express.favicon({ maxAge: 2592000000 }));
	parent.use(express.logger('dev'));
	parent.use(express.bodyParser());
	parent.use(express.methodOverride());
	parent.use(require('stylus').middleware(__dirname + '/../../public/stylesheets'));

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