'use strict';

var pg        = require('../postgres/manager'),
    multiline = require('multiline');

function Therapist(obj){
  this.discId           = obj.disc_id;
  this.first            = obj.first;
  this.last             = obj.last;
  this.isTherapist      = obj.is_therapist;
  this.productivityGoal = obj.productivity_goal;
  this.email            = obj.email;
  this.phone            = obj.phone;
}

Therapist.findById = function(user, id, cb){
  pg.query('select * from therapists where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Therapist.all = function(user, cb){
  var sql = multiline.stripIndent(function(){/*
    select
      t.id,
      t.org_id,
      t.disc_id,
      d.name as "disc_name",
      d.abbr as "disc_abbr",
      t.first,
      t.last,
      t.is_therapist,
      t.photo,
      t.productivity_goal,
      t.email,
      t.phone
    from therapists t
    inner join disciplines d on d.id = t.disc_id
    where t.org_id = $1
    */});
  pg.query(sql, [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Therapist.add = function(user, obj, cb){
  var therapist = new Therapist(obj);
  pg.query('select therapist_add($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        user.org.id, therapist.discId, therapist.first, therapist.last,
        therapist.isTherapist, therapist.productivityGoal, therapist.email,
        therapist.phone
      ],
      function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Therapist.update = function(user, obj, cb){
  pg.query('select therapist_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        obj.id, user.org.id, obj.disc_id, obj.first, obj.last, obj.is_therapist,
        obj.photo, obj.productivity_goal, obj.email, obj.phone
      ],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = Therapist;
