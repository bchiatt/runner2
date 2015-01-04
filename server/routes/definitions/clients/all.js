'use strict';

var Client = require('../../../models/client');

module.exports = {
  description: 'Retrieve All Clients',
  tags:['clients'],
  handler: function(request, reply){
    Client.all(request.auth.credentials, function(err, clients){
      console.log(err);
      reply({clients:clients}).code(err ? 400 : 200);
    });
  }
};
