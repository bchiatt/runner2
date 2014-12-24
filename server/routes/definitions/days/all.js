'use strict';

var Day = require('../../../models/day');

module.exports = {
  description: 'Retrieve All Days',
  tags:['days'],
  handler: function(request, reply){
    Day.all(request.auth.credentials, function(err, days){
      reply({days:days}).code(err ? 400 : 200);
    });
  }
};
