'use strict';

var Joi        = require('joi'),
    Day = require('../../../models/day');

module.exports = {
  description: 'Create A Day',
  tags:['days'],
  validate: {
    payload: {
      num: Joi.number().required(),
      full_name: Joi.string().required(),
      abbr: Joi.string().required(),
      letter: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Day.add(request.auth.credentials, request.payload, function(err, results){
      reply(results).code(err ? 400 : 200);
    });
  }
};
