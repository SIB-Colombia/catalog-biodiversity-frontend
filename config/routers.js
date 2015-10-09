var express = require('express')
  , fs = require('fs');

module.exports = function(parent, options){
  var verbose = options.verbose;
  console.log(__dirname);
  fs.readdirSync(__dirname + '/../app/controllers').forEach(function(name){
    verbose && console.log('\n %s:', name);
    var obj = require('./../app/controllers/' + name)
      , name = obj.name || name
      , prefix = obj.prefix || ''
      , app = express()
      , method
      , path;

    // allow specifying the view engine
    if (obj.engine) app.set('view engine', obj.engine);
    app.set('views', __dirname + '/../app/views/' + name);

    // before middleware support
    if (obj.before) {
      path = '/' + name + '/:' + name + '_id';
      app.all(path, obj.before);
      verbose && console.log(' ALL %s -> before', path);
      path = '/' + name + '/:' + name + '_id/*';
      app.all(path, obj.before);
      verbose && console.log(' ALL %s -> before', path);
    }

    // generate routes based
    // on the exported methods
    for (var key in obj) {
      // "reserved" exports
      if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
      // route exports
      switch (key) {
        case 'index':
          method = 'get';
          path = '/invasoras';
          break;
        case 'redirectAdministrationUrl':
          method = 'get';
          path = '/invasoras/admin';
          break;
        case 'showAllSpecies':
          method = 'get';
          path = '/invasoras/species_list_dynamic';
          break;
        case 'showAllSpeciesSimple':
          method = 'get';
          path = '/invasoras/listado_especies';
          break;
        case 'test':
          method = 'get';
          path = '/invasoras/test';
          break;
        case 'show':
          method = 'get';
          path = '/invasoras/' + name + '/id/:' + '_id';
          break;
        case 'partials':
          method = 'get';
          path = '/invasoras/partials/:name';
          break;
        default:
          throw new Error('unrecognized route: ' + name + '.' + key);
      }

      path = prefix + path;
      app[method](path, obj[key]);
      verbose && console.log(' %s %s -> %s', method.toUpperCase(), path, key);
    }

    // mount the app
    parent.use(app);
  });
};
