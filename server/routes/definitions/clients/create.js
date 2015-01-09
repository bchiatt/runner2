'use strict';

var Joi    = require('joi'),
    Client = require('../../../models/client');

module.exports = {
  description: 'Create A Client',
  tags:['clients'],
  validate: {
    payload: {
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
    Client.add(request.auth.credentials, request.payload, function(err, results){
      reply(results).code(err ? 400 : 200);
    });
  }
};
