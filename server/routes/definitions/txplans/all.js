'use strict';

var TreatmentPlan = require('../../../models/treatmentplan');

module.exports = {
  description: 'Retrieve All Treatment Plans',
  tags:['treatment plans'],
  handler: function(request, reply){
    TreatmentPlan.all(request.auth.credentials, function(err, txPlans){
      reply({txPlans:txPlans}).code(err ? 400 : 200);
    });
  }
};
