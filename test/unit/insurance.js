/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Insurance  = require('../../server/models/insurance'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Insurance', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an insurance object', function(done){
      var ins = new Insurance({name: 'Medicare B', isRug: false});

      expect(ins).to.be.instanceof(Insurance);
      expect(ins.name).to.equal('Medicare B');
      done();
    });
  });

  describe('.add', function(){
    it('should add a new insurance', function(done){
      Insurance.add({org: {id: 1}}, {name: 'Medicare B', isRug: false}, function(err, results){
        expect(results.insurance_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT add a new insurance - duplicate', function(done){
      Insurance.add({org: {id: 1}}, {name: 'Medicare A', isRug: true}, function(err, results){
        expect(err).to.be.ok;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find an insurance', function(done){
      Insurance.findById({org: {id: 1}}, 1, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.name).to.equal('Medicare A');
        done();
      });
    });
    it('should NOT find an insurance - wrong org', function(done){
      Insurance.findById({org: {id: 2}}, 5, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all insurances by organization', function(done){
      Insurance.all({org: {id: 1}}, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(2);
        done();
      });
    });
  });

  describe('.update', function(){
    it('should update a insurance', function(done){
      Insurance.update({org: {id: 1}}, {id: 1, name: 'BCBS', isRug: true}, function(err, results){
        expect(results.insurance_update).to.equal(true);
        expect(err).to.be.null;
        done();
      });
    });
  });
});
