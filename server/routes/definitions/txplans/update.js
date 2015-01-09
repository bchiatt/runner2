'use strict';

var Joi        = require('joi'),
    TxPlan= require('../../../models/treatmentplan');

module.exports = {
  description: 'Update A Treatment Plan',
  tags:['treatment plans'],
  validate: {
    payload: {
      id: Joi.number().required(),
      disc_id: Joi.number().required(),
      client_id: Joi.number().required(),
      eval_therapist_id: Joi.number().required(),
      weekly_day_id: Joi.number().required(),
      frequency_low: Joi.number().required(),
      frequency_high: Joi.number().required(),
      eval_date: Joi.string().required(),
      recert_date: Joi.string(),
      discharge_date: Joi.string()
    }
  },
  handler: function(request, reply){
    TxPlan.update(request.auth.credentials, request.payload, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
