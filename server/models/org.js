'use strict';

var pg     = require('../postgres/manager');

function Org(obj){
  this.orgName = obj.orgName;
  this.city    = obj.city;
  this.state   = obj.state;

}

Org.findOne = function(obj, cb){
  pg.query('select * from orgs where name ilike $1 limit 1', [obj.orgName], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Org.register = function(obj, cb){
  var org = new Org(obj);
  pg.query('insert into orgs (name, city, state) values ($1, $2, $3) returning id', [org.orgName, org.city, org.state], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Org.changeAdmin = function(orgId, userId, cb){
   pg.query('update orgs set admin_id = $1 where id = $2', [userId, orgId], function(err, results){
     cb(err, results && results.rowCount ? results.rowCount : null);
   });
};

module.exports = Org;
