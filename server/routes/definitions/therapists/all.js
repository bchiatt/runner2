'use strict';

var Therapist = require('../../../models/therapist');

module.exports = {
  description: 'Retrieve All Therapists',
  tags:['therapists'],
  cors:{origin: ['http://localhost:8100'], credentials: true},
  handler: function(request, reply){
    Therapist.all(request.auth.credentials, function(err, therapists){
      reply({therapists:therapists}).code(err ? 400 : 200);
    });
  }
};
