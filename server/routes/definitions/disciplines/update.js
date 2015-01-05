'use strict';

var Joi        = require('joi'),
    Discipline = require('../../../models/discipline');

module.exports = {
  description: 'Update A Discipline',
  tags:['disciplines'],
  validate: {
    payload: {
      id: Joi.number().required(),
      org_id: Joi.number().required(),
      name: Joi.string().required(),
      abbr: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Discipline.update(request.auth.credentials, request.payload, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
