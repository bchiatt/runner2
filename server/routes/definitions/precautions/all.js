'use strict';

var Precaution = require('../../../models/precaution');

module.exports = {
  description: 'Retrieve All Precautions',
  tags:['precautions'],
  handler: function(request, reply){
    Precaution.all(request.auth.credentials, function(err, precautions){
      reply({precautions:precautions}).code(err ? 400 : 200);
    });
  }
};
