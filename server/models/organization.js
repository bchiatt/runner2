'use strict';

var pg     = require('../postgres/manager'),
    crypto = require('crypto');

function Organization(obj){
  this.orgName = obj.orgName;
  this.city    = obj.city;
  this.state   = obj.state;

}

Organization.findByName = function(obj, cb){
  pg.query('select * from orgs where name ilike $1 limit 1', [obj.orgName], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Organization.register = function(obj, cb){
  var org = new Organization(obj);
  crypto.randomBytes(48, function(ex, buf){
    org.token  = buf.toString('hex');
    pg.query('insert into orgs (name, city, state, token) values ($1, $2, $3, $4) returning id', [org.orgName, org.city, org.state, org.token], function(err, results){
      cb(err, results && results.rows[0] ? results.rows[0] : null);
    });
  });
};

Organization.changeAdmin = function(orgId, userId, cb){
   pg.query('update orgs set admin_id = $1 where id = $2', [userId, orgId], function(err, results){
     cb(err, results && results.rowCount ? results.rowCount : null);
   });
};

module.exports = Organization;
