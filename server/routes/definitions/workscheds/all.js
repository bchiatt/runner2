'use strict';

var Joi          = require('joi'),
    WorkSchedule = require('../../../models/workschedule');

module.exports = {
  description: 'Retrieve Work Schedules',
  tags:['work schedules'],
  validate: {
    query: {
      therapistId: Joi.number()
    }
  },
  handler: function(request, reply){
    WorkSchedule.all(request.auth.credentials, request.query, function(err, workScheds){
      reply({workScheds:workScheds}).code(err ? 400 : 200);
    });
  }
};
