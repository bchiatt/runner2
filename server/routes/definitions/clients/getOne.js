'use strict';

var Client = require('../../../models/client');

module.exports = {
  description: 'Retrieve A Client',
  tags:['clients'],
  handler: function(request, reply){
    Client.findById(request.auth.credentials, request.params.id, function(err, client){
      reply({client:client}).code(err ? 400 : 200);
    });
  }
};
