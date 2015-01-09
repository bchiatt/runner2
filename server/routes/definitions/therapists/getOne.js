'use strict';

var Therapist = require('../../../models/therapist');

module.exports = {
  description: 'Retrieve A Therapist',
  tags:['therapists'],
  handler: function(request, reply){
    Therapist.findById(request.auth.credentials, request.params.id, function(err, therapist){
      reply({therapist:therapist}).code(err ? 400 : 200);
    });
  }
};
