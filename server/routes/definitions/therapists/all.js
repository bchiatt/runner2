'use strict';

var Therapist = require('../../../models/therapist');

module.exports = {
  description: 'Retrieve All Therapists',
  tags:['therapists'],
  handler: function(request, reply){
    console.log('payload', request.payload);
    Therapist.all(request.auth.credentials, function(err, therapists){
      console.log('err', err);
      reply({therapists:therapists}).code(err ? 400 : 200);
    });
  }
};
