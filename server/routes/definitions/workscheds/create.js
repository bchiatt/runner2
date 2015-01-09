'use strict';

var Joi        = require('joi'),
    WorkSchedule = require('../../../models/workschedule');

module.exports = {
  description: 'Create A Work Schedule',
  tags:['work schedules'],
  validate: {
    payload: {
      day_id: Joi.number().required(),
      therapist_id: Joi.number().required(),
      start_time: Joi.string().required(),
      end_time: Joi.string().required(),
      is_late_eval: Joi.boolean().required()
    }
  },
  handler: function(request, reply){
    WorkSchedule.add(request.auth.credentials, request.payload, function(err, results){
      reply(results).code(err ? 400 : 200);
    });
  }
};
