'use strict';

var Joi       = require('joi'),
    Treatment = require('../../../models/treatment');

module.exports = {
  description: 'Delete A Treatment',
  tags:['treatments'],
  validate: {
    params: {
      id: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Treatment.nuke(request.auth.credentials, request.params.id, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
