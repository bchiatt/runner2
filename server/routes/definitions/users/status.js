'use strict';

module.exports = {
  description: 'Get User Status',
  tags:['users'],
  cors:{origin: ['http://localhost:8100'], credentials: true},
  handler: function(request, reply){
    reply(request.auth.credentials);
  }
};
