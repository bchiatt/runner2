'use strict';

var pg        = require('../postgres/manager'),
    multiline = require('multiline'),
    crypto    = require('crypto'),
    AWS    = require('aws-sdk');


function Client(obj){
  this.first         = obj.first;
  this.last          = obj.last;
  this.insId         = obj.ins_id;
  this.room          = obj.room;
  this.email         = obj.email;
  this.phone         = obj.phone;
  this.admitDate     = obj.admit_date;
  this.dischargeDate = obj.discharge_date;
}

Client.findById = function(user, id, cb){
  pg.query('select * from clients where id = $1 and org_id = $2limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Client.all = function(user, cb){
  var sql = multiline.stripIndent(function(){/*
    select
      c.id,
      c.ins_id,
      i.name as ins_name,
      i.is_rug as ins_is_rug,
      c.first,
      c.last,
      c.email,
      c.phone,
      c.photo,
      c.room,
      c.admit_date,
      c.discharge_date
    from clients c
    left outer join insurances i on i.id = c.ins_id
    where c.org_id = $1
    */});
  pg.query(sql, [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Client.add = function(user, obj, cb){
  var client = new Client(obj);
  pg.query('select client_add($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        user.org.id, client.first, client.last, client.insId, client.admitDate,
        client.dischargeDate, client.room, client.email, client.phone
      ],
      function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Client.update = function(user, obj, cb){
  pg.query('select client_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        obj.id, user.org.id, obj.ins_id, obj.first, obj.last, obj.email,
        obj.phone, obj.photo, obj.room, obj.admit_date, obj.discharge_date
      ],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

Client.uploadmobile = function(user, b64, clientId, cb){
  var s3   = new AWS.S3();

  crypto.randomBytes(48, function(ex, buf){
    var hex = buf.toString('hex'),
    loc = user.org_id + '/' + clientId + '/' + hex + '.jpg',
    url = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + loc;

    pg.query('update clients set photo = $1 where id = $2 and org_id = $3', [url, clientId, user.org.id], function(err, results){
      if(err){return cb(err);}

      var bin    = new Buffer(b64, 'base64'),
      params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: bin, ACL: 'public-read'};
      s3.putObject(params, cb);
    });
  });
};

module.exports = Client;
