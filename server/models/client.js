'use strict';

var pg     = require('../postgres/manager');

function Client(obj){
  this.first = obj.first;
  this.last = obj.last;
}

Client.findById = function(id, cb){
  pg.query('select * from clients where id = $1 limit 1',
      [id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Client.all = function(user, cb){
  pg.query('select * from clients where org_id = $1',
      [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Client.add = function(user, obj, cb){
  var client = new Client(obj);
  pg.query('select client_add($1, $2, $3)',
      [user.org.id, client.first, client.last], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Client.update = function(user, obj, cb){
  pg.query('select client_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        obj.id, user.org.id, obj.insId, obj.first, obj.last, obj.email,
        obj.phone, obj.photo, obj.room, obj.admitDate, obj.dischargeDate
      ],
      function(err, results){
    cb(err, results && results.rowCount ? results.rowCount : null);
  });
};

module.exports = Client;
