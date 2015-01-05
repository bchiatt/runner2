'use strict';

var Joi       = require('joi'),
    Insurance = require('../../../models/insurance');

module.exports = {
  description: 'Update An Insurance',
  tags:['insurances'],
  validate: {
    payload: {
      id: Joi.number().required(),
      org_id: Joi.number().required(),
      name: Joi.string().required(),
      is_rug: Joi.boolean().required()
    }
  },
  handler: function(request, reply){
    Insurance.update(request.auth.credentials, request.payload, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
