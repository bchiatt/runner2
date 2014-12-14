'use strict';

var Hapi         = require('hapi'),
    server       = new Hapi.Server(),
  routes         = require('./routes/config/routes'),
  plugins        = require('./routes/config/plugins'),
  authentication = require('./routes/config/authentication');

server.connection({host: '0.0.0.0', port: process.env.PORT});
server.register(plugins, function(){
  server.auth.strategy('session', 'cookie', true, authentication);
  server.route(routes);
  server.start(function(err){
    server.log('info', server.info.uri);
  });
});
