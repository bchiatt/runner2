'use strict';

var bcrypt = require('bcrypt'),
    pg     = require('../postgres/manager');

function User(obj){
  this.first    = obj.first;
  this.last     = obj.last;
  this.username = obj.username;
}

User.register = function(obj, orgId, cb){
  var user = new User(obj);
  user.password = bcrypt.hashSync(obj.password, 10);
  pg.query('insert into users (org_id, first, last, username, password) values ($1, $2, $3, $4, $5) returning id', [orgId, user.first, user.last, user.username, user.password], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

User.login = function(obj, cb){
  pg.query('select * from users where username = $1 limit 1', [obj.username], function(err, results){
    var user = results.rows[0];
    if(!user){return cb();}

    var isAuth = bcrypt.compareSync(obj.password, user.password);
    if(!isAuth){return cb();}

    delete user.password;
    cb(user);
  });
};

module.exports = User;
