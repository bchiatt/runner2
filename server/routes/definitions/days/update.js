'use strict';

var Joi        = require('joi'),
    Day = require('../../../models/day');

module.exports = {
  description: 'Update A Day',
  tags:['days'],
  validate: {
    payload: {
      id: Joi.number().required(),
      org_id: Joi.number().required(),
      num: Joi.number().required(),
      full_name: Joi.string().required(),
      abbr: Joi.string().required(),
      letter: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Day.update(request.auth.credentials, request.payload, function(err, results){
      console.log('err', err);
      reply().code(err ? 400 : 200);
    });
  }
};
