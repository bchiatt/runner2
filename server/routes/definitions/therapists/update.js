'use strict';

var Joi        = require('joi'),
    Therapist = require('../../../models/therapist');

module.exports = {
  description: 'Update A Therapist',
  tags:['therapists'],
  validate: {
    payload: {
      id: Joi.number().required(),
      org_id: Joi.number(),
      first: Joi.string().required(),
      last: Joi.string().required(),
      disc_id: Joi.number().required(),
      is_therapist: Joi.boolean().required(),
      phone: Joi.string(),
      email: Joi.string(),
      productivity_goal: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Therapist.update(request.auth.credentials, request.payload, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
