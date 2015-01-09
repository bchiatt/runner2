'use strict';

var TreatmentPlan = require('../../../models/treatmentplan'),
Joi       = require('joi');

module.exports = {
  description: 'Retrieve All TreatmentPlans',
  tags:['treatment plans'],
  validate: {
    query: {
      clientId: Joi.number()
    }
  },
  handler: function(request, reply){
    TreatmentPlan.all(request.auth.credentials, request.query.clientId, function(err, txPlans){
      reply({txPlans:txPlans}).code(err ? 400 : 200);
    });
  }
};
