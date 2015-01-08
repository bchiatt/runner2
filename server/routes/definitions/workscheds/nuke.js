'use strict';

var Joi          = require('joi'),
    WorkSchedule = require('../../../models/workschedule');

module.exports = {
  description: 'Delete A Work Schedule Entry',
  tags:['work schedules'],
  validate: {
    params: {
      id: Joi.number().required()
    }
  },
  handler: function(request, reply){
    WorkSchedule.nuke(request.auth.credentials, request.params.id, function(err, results){
      reply().code(err ? 400 : 200);
    });
  }
};
