'use strict';

var Joi       = require('joi'),
    Insurance = require('../../../models/insurance');

module.exports = {
  description: 'Create An Insurance',
  tags:['insurances'],
  validate: {
    payload: {
      name: Joi.string().required(),
      is_rug: Joi.boolean().required()
    }
  },
  handler: function(request, reply){
    Insurance.add(request.auth.credentials, request.payload, function(err, results){
      reply(results).code(err ? 400 : 200);
    });
  }
};
