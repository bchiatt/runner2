'use strict';

var pg     = require('../postgres/manager');

function Org(obj){
  this.bizName = obj.bizName;
  this.city    = obj.city;
  this.state   = obj.state;

}

Org.findOne = function(obj, cb){
  pg.query('select * from orgs where bizName = $1 limit 1', [obj.bizName], function(err, results){
    cb(err, results.rows[0]);
  });
};

Org.register = function(obj, cb){
  var org = new Org(obj);
  pg.query('insert into orgs (username, password) values ($1, $2) returning id', [user.username, user.password], cb);
};

Org.changeAdmin = function(userId, cb){
   console.log(userId);
   cb();
};

module.exports = Org;
