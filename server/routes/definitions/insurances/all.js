'use strict';

var Insurance = require('../../../models/insurance');

module.exports = {
  description: 'Retrieve All Insurances',
  tags:['insurances'],
  handler: function(request, reply){
    Insurance.all(request.auth.credentials, function(err, ins){
      reply({insurances:ins}).code(err ? 400 : 200);
    });
  }
};
