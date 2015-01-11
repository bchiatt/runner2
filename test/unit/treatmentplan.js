/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
TreatmentPlan  = require('../../server/models/treatmentplan'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('TreatmentPlan', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a treatment plan object', function(done){
      var obj = {
                  client_id: 1,
                  eval_therapist_id: 2,
                  disc_id: 3,
                  eval_date: '12/1/2014',
                  weekly_day_id: 5,
                  frequency_high: 7,
                  frequency_low: 5
                },
          txPlan = new TreatmentPlan(obj);

      expect(txPlan).to.be.instanceof(TreatmentPlan);
      expect(txPlan.freqHigh).to.equal(7);
      done();
    });
  });

  describe('.add', function(){
    it('should add a new treatment plan', function(done){
      var obj = {
                  client_id: 1,
                  eval_therapist_id: 2,
                  disc_id: 3,
                  eval_date: '12/1/2014',
                  weekly_day_id: 5,
                  frequency_high: 7,
                  frequency_low: 5
                };
      TreatmentPlan.add({org: {id: 1}}, obj, function(err, results){
        expect(results.treatment_plan_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a treatment plan', function(done){
      TreatmentPlan.findById({org: {id: 1}}, 1, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.frequency_high).to.equal(7);
        done();
      });
    });
    it('should NOT find a treatment plan - wrong org', function(done){
      TreatmentPlan.findById({org: {id: 2}}, 1, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all treatment plans by organization', function(done){
      TreatmentPlan.all({org: {id: 1}}, undefined, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(3);
        done();
      });
    });
  });

  describe('.update', function(){
    it('should update a treatment plan', function(done){
      TreatmentPlan.update({org: {id: 1}}, {id: 1, dayId: 3, freqHigh: 6}, function(err, results){
        expect(results.treatment_plan_update).to.equal(true);
        expect(err).to.be.null;
        done();
      });
    });
  });
});
