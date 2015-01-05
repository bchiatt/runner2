'use strict';

var Joi        = require('joi'),
    Precaution = require('../../../models/precaution');

module.exports = {
  description: 'Create A Precaution',
  tags:['precautions'],
  validate: {
    payload: {
      name: Joi.string().required(),
      description: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Precaution.add(request.auth.credentials, request.payload, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
