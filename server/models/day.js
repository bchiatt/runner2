'use strict';

var pg     = require('../postgres/manager');

function Day(obj){
  this.name   = obj.name;
  this.abbr   = obj.abbr;
  this.letter = obj.letter;
}

Day.findById = function(user, id, cb){
  pg.query('select * from days_in_week where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Day.all = function(user, cb){
  pg.query('select * from days_in_week where org_id = $1',
      [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Day.add = function(user, obj, cb){
  var day = new Day(obj);
  pg.query('select day_add($1, $2, $3, $4)',
      [user.org.id, day.name, day.abbr, day.letter], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Day.update = function(user, obj, cb){
  pg.query('select day_update($1, $2, $3, $4, $5)',
      [obj.id, user.org.id, obj.name, obj.abbr, obj.letter],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = Day;
