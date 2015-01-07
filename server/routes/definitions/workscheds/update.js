'use strict';

var Joi        = require('joi'),
    WorkSchedule = require('../../../models/workschedule');

module.exports = {
  description: 'Update A Work Schedule',
  tags:['work schedules'],
  validate: {
    payload: {
      id: Joi.number().required(),
      day_id: Joi.number().required(),
      therapist_id: Joi.number().required(),
      start_time: Joi.string().required(),
      end_time: Joi.string().required(),
      is_late_eval: Joi.boolean().required()
    }
  },
  handler: function(request, reply){
    console.log(request.payload);
    WorkSchedule.update(request.auth.credentials, request.payload, function(err, results){
      console.log('err', err);
      console.log('results', results);
      reply().code(err ? 400 : 200);
    });
  }
};
