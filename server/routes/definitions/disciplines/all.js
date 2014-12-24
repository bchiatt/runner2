'use strict';

var Discipline = require('../../../models/discipline');

module.exports = {
  description: 'Retrieve All Disciplines',
  tags:['disciplines'],
  handler: function(request, reply){
    Discipline.all(request.auth.credentials, function(err, disciplines){
      reply({disciplines:disciplines}).code(err ? 400 : 200);
    });
  }
};
