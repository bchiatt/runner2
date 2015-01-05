'use strict';

var Joi        = require('joi'),
    Discipline = require('../../../models/discipline');

module.exports = {
  description: 'Create A Discipline',
  tags:['disciplines'],
  validate: {
    payload: {
      name: Joi.string().required(),
      abbr: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Discipline.add(request.auth.credentials, request.payload, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
