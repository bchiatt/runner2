'use strict';

var Joi        = require('joi'),
    Client = require('../../../models/client');

module.exports = {
  description: 'Update A Client',
  tags:['clients'],
  validate: {
    payload: {
      id: Joi.number().required(),
      first: Joi.string().required(),
      last: Joi.string().required(),
      ins_id: Joi.number().required(),
      room: Joi.string(),
      admit_date: Joi.string(),
      discharge_date: Joi.string(),
      phone: Joi.string(),
      email: Joi.string()
    }
  },
  handler: function(request, reply){
    Client.update(request.auth.credentials, request.payload, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
