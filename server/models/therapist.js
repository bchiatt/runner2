'use strict';

var pg     = require('../postgres/manager');

function Therapist(obj){
  this.discId = obj.discId;
  this.first = obj.first;
  this.last = obj.last;
  this.isTherapist = obj.isTherapist;
}

Therapist.findById = function(user, id, cb){
  pg.query('select * from therapists where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Therapist.all = function(user, cb){
  pg.query('select * from therapists where org_id = $1',
      [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Therapist.add = function(user, obj, cb){
  var therapist = new Therapist(obj);
  pg.query('select therapist_add($1, $2, $3, $4, $5)',
      [
        user.org.id, therapist.discId, therapist.first,
        therapist.last, therapist.isTherapist
      ],
      function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Therapist.update = function(user, obj, cb){
  pg.query('select therapist_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        obj.id, user.org.id, obj.discId, obj.first, obj.last, obj.isTherapist,
        obj.photo, obj.productivity, obj.email, obj.phone
      ],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = Therapist;
