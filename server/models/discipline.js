'use strict';

var pg     = require('../postgres/manager');

function Discipline(obj){
  this.abbr = obj.abbr;
  this.name = obj.name;
}

Discipline.findById = function(id, cb){
  pg.query('select * from disciplines where id = $1 limit 1', [id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Discipline.all = function(user, cb){
  pg.query('select * from disciplines where org_id = $1', [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Discipline.add = function(user, obj, cb){
  var disc = new Discipline(obj);
  pg.query('select discipline_add($1, $2, $3)', [user.org.id, disc.name, disc.abbr], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Discipline.update = function(obj, cb){
   pg.query('select discipline_update($1, $2, $3, $4)', [obj.id, obj.orgId, obj.name, obj.abbr], function(err, results){
     cb(err, results && results.rowCount ? results.rowCount : null);
   });
};

module.exports = Discipline;
