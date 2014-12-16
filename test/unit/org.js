/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Org        = require('../../server/models/org'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Org', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an org object', function(done){
      var org = new Org({orgName: 'NSS', city: 'Nashville', state:'TN'});

      expect(org).to.be.instanceof(Org);
      expect(org.city).to.equal('Nashville');
      done();
    });
  });

  describe('.register', function(){
    it('should register a new org', function(done){
      Org.register({orgName: 'NSS', city: 'Nashville', state: 'TN'}, function(err, results){
        expect(results.id).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT register a new org - duplicate', function(done){
      Org.register({orgName: 'Trevecca', city: 'Nashville', state: 'TN', }, function(err, results){
        expect(err).to.be.ok;
        done();
      });
    });
  });

  describe('.findOne', function(){
    it('should find an org', function(done){
      Org.findOne({orgName: 'NSS', city: 'Nashville', state: 'TN'}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
    it('should NOT find an org - not exist', function(done){
      Org.findOne({orgName: 'trevecca', city: 'Nashville', state: 'TN', }, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        done();
      });
    });
  });

  describe('.changeAdmin', function(){
    it('should change org admin id', function(done){
      Org.changeAdmin(1, 1, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.equal(1);
        done();
      });
    });
    it('should NOT change org admin id - no user', function(done){
      Org.changeAdmin(1, 2, function(err, results){
        expect(err).to.be.ok;
        expect(results).to.be.null;
        done();
      });
    });
    it('should NOT change org admin id - no org', function(done){
      Org.changeAdmin(2, 1, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });
});
