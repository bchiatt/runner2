'use strict';

var Joi       = require('joi'),
    Treatment = require('../../../models/treatment');

module.exports = {
  description: 'Create A Treatment',
  tags:['treatments'],
  validate: {
    payload: {
      client_id: Joi.number().required(),
      therapist_id: Joi.number().required(),
      disc_id: Joi.number().required(),
      ins_id: Joi.number().required(),
      mins_expected: Joi.number().required(),
      mins_actual: Joi.number(),
      day_count: Joi.number().required(),
      tx_date: Joi.string().required(),
      is_note_done: Joi.boolean().required(),
      is_archived: Joi.boolean().required()
    }
  },
  handler: function(request, reply){
    Treatment.add(request.auth.credentials, request.payload, function(err, results){
      console.log('err', err);
      console.log('results', results);
      reply(results).code(err ? 400 : 200);
    });
  }
};
