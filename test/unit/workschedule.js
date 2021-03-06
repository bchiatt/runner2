/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
WorkSchedule  = require('../../server/models/workschedule'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('WorkSchedule', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an work schedule object', function(done){
      var obj = {
                  therapist_id: 1,
                  day_id: 4,
                  is_late_eval: false,
                  start_time: '10:00 am',
                  end_time: '6:00 pm'
                },
          wSched = new WorkSchedule(obj);

      expect(wSched).to.be.instanceof(WorkSchedule);
      expect(wSched.dayId).to.equal(4);
      done();
    });
  });

  describe('.add', function(){
    it('should add a new work schedule', function(done){
      var obj = {
                  therapist_id: 1,
                  day_id: 4,
                  is_late_eval: false,
                  start_time: '10:00 am',
                  end_time: '6:00 pm'
                };
      WorkSchedule.add({org: {id: 1}}, obj, function(err, results){
        expect(results.work_schedule_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find an work schedule', function(done){
      WorkSchedule.findById({org: {id: 1}}, 2, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.is_late_eval).to.equal(false);
        done();
      });
    });
    it('should NOT find an work schedule - wrong org', function(done){
      WorkSchedule.findById({org: {id:1}}, 3, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all work schedules by organization', function(done){
      WorkSchedule.all({org: {id: 1}}, {therapistId: undefined}, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(3);
        done();
      });
    });
  });

  describe('.update', function(){
    it('should update a work schedule', function(done){
      WorkSchedule.update({org: {id: 1}}, {id: 1, dayId: 4, startTime: '6:00 am'}, function(err, results){
        expect(results.work_schedule_update).to.equal(true);
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.nuke', function(){
    it('should delete a work schedule entry', function(done){
      WorkSchedule.nuke({org: {id: 1}}, 2, function(err, results){
        expect(results.work_schedule_nuke).to.equal(2);
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT delete a work schedule entry - wrong org', function(done){
      WorkSchedule.nuke({org: {id: 1}}, 3, function(err, results){
        expect(results.work_schedule_nuke).to.be.null;
        expect(err).to.be.null;
        done();
      });
    });
  });
});
