/*
 * Module dependencies.
 */
var express = require('express')
  , http = require('http');

var app = express();

var proxy = require("simple-http-proxy"); //Module for SIB Colombia Photoblog proxy, you can delete it without consequences

// Load runtime vars
require('./config/runtime_vars');

// Load app configuration
require('./config/environments/all')(app);

app.use("/fotoblog", proxy("http://www.biodiversidad.co:8080/fotoblog/")); //Module for SIB Colombia Photoblog proxy, you can delete it without consequences

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});