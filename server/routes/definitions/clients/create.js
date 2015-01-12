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
      room: Joi.string().allow(null),
      admit_date: Joi.string().allow(null),
      discharge_date: Joi.string().allow(null),
      phone: Joi.string().allow(null),
      email: Joi.string().allow(null)
    }
  },
  handler: function(request, reply){
    Client.add(request.auth.credentials, request.payload, function(err, results){
      reply(results).code(err ? 400 : 200);
    });
  }
};
