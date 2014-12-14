'use strict';

var Joi  = require('joi'),
    Org  = require('../../../models/org'),
    User = require('../../../models/user');

module.exports = {
  description: 'Register an Organization',
  tags:['users'],
  validate: {
    payload: {
      org.bizName: Joi.string().min(3).max(255).required(),
      org.city:    Joi.string().min(3).max(255).required(),
      org.state:   Joi.string().length(2).required(),
      admin.first: Joi.strint().min(3).max(255),
      admin.last:  Joi.strint().min(3).max(255),
      username: Joi.string().min(3).max(255),
      password: Joi.string().min(3)
    }
  },
  auth: false,
  handler: function(request, reply){
    if(!payload.admin){
      Org.findOne(request.payload.org, function(err, results){
        reply().code(!results && !error ? 200 : 400);
      });
    }else{
      Org.register(request.payload.org, function(err, results){
        if(err){return reply().code(400);}
        User.register(request.payload.admin, function(err, userId){
          Org.changeAdmin(request.payload.org, userId, function(err){
            reply().code(!results && !error ? 200 : 400);
          });
        });
      });
    }
  }
};
