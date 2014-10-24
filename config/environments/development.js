var express = require('express')
  , path = require('path')
  , winston = require('winston');
var errorhandler = require('errorhandler');

module.exports = function(parent) {
	parent.use(errorhandler());

	logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)()
		]
	});
};
