'use strict';

module.exports = {
  description: 'Static Routes',
  tags:['general'],
  auth: false,
  cors:{
         origin: ['http://localhost:8100'],
         credentials: true
       },
  handler: {
    directory: {
      path: __dirname + '/../../../../public'
    }
  }
};
