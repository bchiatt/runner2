'use strict';

var pg     = require('../postgres/manager');

function Precaution(obj){
  this.name = obj.name;
  this.description = obj.description;
}

Precaution.findById = function(user, id, cb){
  pg.query('select * from precautions where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Precaution.all = function(user, cb){
  pg.query('select * from precautions where org_id = $1',
      [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Precaution.add = function(user, obj, cb){
  var precaution = new Precaution(obj);
  pg.query('select precaution_add($1, $2, $3)',
      [user.org.id, precaution.name, precaution.description],
      function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Precaution.update = function(user, obj, cb){
  pg.query('select precaution_update($1, $2, $3, $4)',
      [obj.id, user.org.id, obj.name, obj.description], function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = Precaution;
