'use strict';

var pg     = require('../postgres/manager');

function Insurance(obj){
  this.name  = obj.name;
  this.isRug = obj.is_rug;
}

Insurance.findById = function(user, id, cb){
  pg.query('select * from insurances where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Insurance.all = function(user, cb){
  pg.query('select * from insurances where org_id = $1',
      [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Insurance.add = function(user, obj, cb){
  var ins = new Insurance(obj);
  pg.query('select insurance_add($1, $2, $3)',
      [user.org.id, ins.name, ins.isRug], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Insurance.update = function(user, obj, cb){
  pg.query('select insurance_update($1, $2, $3, $4)',
      [obj.id, user.org.id, obj.name, obj.is_rug], function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = Insurance;
