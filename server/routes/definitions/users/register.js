'use strict';

var Joi  = require('joi'),
    Org  = require('../../../models/org'),
    User = require('../../../models/user');

module.exports = {
  description: 'Register an Organization',
  tags:['users'],
  validate: {
    payload: {
      orgName:  Joi.string().min(3).max(255).required(),
      city:     Joi.string().min(3).max(255).required(),
      state:    Joi.string().length(2).required(),
      first:    Joi.string().min(3).max(255),
      last:     Joi.string().min(3).max(255),
      username: Joi.string().min(3).max(255),
      password: Joi.string().min(3)
    }
  },
  auth: false,
  handler: function(request, reply){
    if(!request.payload.username){
      Org.findByName(request.payload, function(err, results){
        reply(results).code(!results && !err ? 200 : 400);
      });
    }else{
      Org.findByName(request.payload, function(err, results){
        if(results || err){return reply().code(400);}
        Org.register(request.payload, function(err, org){
          //if(err){return reply().code(400);}
          User.register(request.payload, org.id, function(err, user){
            if(err || !user){return reply().code(400);}
            Org.changeAdmin(org.id, user.id, function(err, results){
              reply().code(results && !err ? 200 : 400);
            });
          });
        });
      });
    }
  }
};
