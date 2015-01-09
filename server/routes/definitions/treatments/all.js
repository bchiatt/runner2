'use strict';

var Treatment = require('../../../models/treatment'),
    Joi       = require('joi');

module.exports = {
  description: 'Retrieve All Treatments',
  tags:['treatments'],
  validate: {
    query: {
      clientId: Joi.number()
    }
  },
  handler: function(request, reply){
    Treatment.all(request.auth.credentials, request.query.clientId, function(err, txs){
      console.log('error', err);
      console.log('treatments', txs);
      reply({treatments:txs}).code(err ? 400 : 200);
    });
  }
};
