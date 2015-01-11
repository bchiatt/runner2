/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Client     = require('../../server/models/client'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Client', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an client object', function(done){
      var client = new Client({first: 'Sally', last: 'Thomas'});

      expect(client).to.be.instanceof(Client);
      expect(client.first).to.equal('Sally');
      done();
    });
  });

  describe('.add', function(){
    it('should add a new client', function(done){
      var obj = {
        first: 'Sally',
        last: 'Thomas',
        ins_id: 1,
        admit_date: 'Nov 12, 2014',
        room: '213A'
      };
      Client.add({org: {id: 1}}, obj, function(err, results){
        expect(results.client_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a client', function(done){
      Client.findById({org: {id: 1}}, 2, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.last).to.equal('Frank');
        done();
      });
    });
    it('should NOT find a client - not exist', function(done){
      Client.findById({org: {id: 1}}, 9, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all clients by organization', function(done){
      Client.all({org: {id: 1}}, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(3);
        done();
      });
    });
  });

  describe('.update', function(){
    it('should update a client', function(done){
      var client = {
                     id: 1,
                     insId: 1,
                     first: 'Sue',
                     last: 'Thomas',
                     phone: '615-555-2468',
                     room: '215B',
                     admitDate: '11/13/14',
                     dischargeDate: '12/31/14'
                   };
      Client.update({org: {id: 1}}, client, function(err, results){
        expect(results.client_update).to.equal(true);
        expect(err).to.be.null;
        done();
      });
    });
  });
});
