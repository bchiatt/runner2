'use strict';

var Joi        = require('joi'),
    Precaution = require('../../../models/precaution');

module.exports = {
  description: 'Update A Precaution',
  tags:['precautions'],
  validate: {
    payload: {
      id: Joi.number().required(),
      org_id: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Precaution.update(request.auth.credentials, request.payload, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
