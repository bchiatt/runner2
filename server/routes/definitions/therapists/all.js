'use strict';

var Therapist = require('../../../models/therapist');

module.exports = {
  description: 'Retrieve All Therapists',
  tags:['therapists'],
  handler: function(request, reply){
    Therapist.all(request.auth.credentials, function(err, therapists){
      reply({therapists:therapists}).code(err ? 400 : 200);
    });
  }
};
