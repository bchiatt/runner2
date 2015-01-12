'use strict';

var Client = require('../../../models/client');

module.exports = {
  description: 'Retrieve All Clients',
  tags:['clients'],
  cors:{origin: ['http://localhost:8100'], credentials: true},
  handler: function(request, reply){
    Client.all(request.auth.credentials, function(err, clients){
      reply({clients:clients}).code(err ? 400 : 200);
    });
  }
};
