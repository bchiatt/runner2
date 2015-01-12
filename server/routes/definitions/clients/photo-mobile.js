'use strict';

var Joi  = require('joi'),
    Client = require('../../../models/client');

module.exports = {
  description: 'Upload a Mobile Photo for Client',
  tags:['clients','photos'],
  validate: {
    params: {
      id: Joi.number().required()
    }
  },
  cors:{origin: ['http://localhost:8100'], credentials: true},
  payload:{
    maxBytes: 20500500,
    timeout: 60000
  },
  handler: function(request, reply){
    Client.uploadmobile(request.auth.credentials, request.payload.buf, request.params.id, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};
