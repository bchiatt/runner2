/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Treatment  = require('../../server/models/treatment'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Treatment', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an treatment object', function(done){
      var obj = {
                  clientId: 1,
                  therId: 2,
                  discId: 3,
                  insId: 2,
                  planId: 1,
                  expMins: 45,
                  txDate: '12/22/2014',
                  dayCount: 27
                },
          txPlan = new Treatment(obj);

      expect(txPlan).to.be.instanceof(Treatment);
      expect(txPlan.expMins).to.equal(45);
      done();
    });
  });

  describe('.add', function(){
    it('should add a new treatment', function(done){
      var obj = {
                  clientId: 1,
                  therId: 2,
                  discId: 3,
                  insId: 2,
                  planId: 1,
                  expMins: 45,
                  txDate: '12/22/2014',
                  dayCount: 27
                };
      Treatment.add({org: {id: 1}}, obj, function(err, results){
        expect(results.treatment_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find an treatment', function(done){
      Treatment.findById({org: {id: 1}}, 3, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.is_note_done).to.equal(true);
        done();
      });
    });
    it('should NOT find an treatment - wrong org', function(done){
      Treatment.findById({org: {id: 2}}, 3, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all treatments by organization', function(done){
      Treatment.all({org: {id: 1}}, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(4);
        done();
      });
    });
  });

  describe('.update', function(){
    it('should update a treatment', function(done){
      Treatment.update({org: {id: 1}}, {id: 1, expMins: 60, dayCount: 45}, function(err, results){
        expect(results.treatment_update).to.equal(true);
        expect(err).to.be.null;
        done();
      });
    });
  });
	describe('.nuke', function(){
    it('should delete a treatment entry', function(done){
      Treatment.nuke({org: {id: 1}}, 2, function(err, results){
        expect(results.treatment_nuke).to.equal(2);
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT delete a treatment entry - wrong org', function(done){
      Treatment.nuke({org: {id: 1}}, 4, function(err, results){
        expect(results.treatment_nuke).to.be.null;
        expect(err).to.be.null;
        done();
      });
    });
  });
});
