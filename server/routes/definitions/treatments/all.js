'use strict';

var Treatment = require('../../../models/treatment');

module.exports = {
  description: 'Retrieve All Treatments',
  tags:['treatments'],
  handler: function(request, reply){
    Treatment.all(request.auth.credentials, function(err, txs){
      reply({treatments:txs}).code(err ? 400 : 200);
    });
  }
};
