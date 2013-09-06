/*
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , expressUglify = require('express-uglify')
  , path = require('path');

var app = express();

// Load configuration
var env = process.env.NODE_ENV || 'development';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('jsonp callback', true );
//app.use(expressUglify.middleware({ src: __dirname + '/public' }));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// load route controllers
require('./lib/router')(app, { verbose: !module.parent });

// Initialize web server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});