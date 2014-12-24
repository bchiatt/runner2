'use strict';

var WorkSchedule = require('../../../models/workschedule');

module.exports = {
  description: 'Retrieve All Work Schedules',
  tags:['work schedules'],
  handler: function(request, reply){
    WorkSchedule.all(request.auth.credentials, function(err, workScheds){
      reply({workScheds:workScheds}).code(err ? 400 : 200);
    });
  }
};
