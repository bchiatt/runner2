/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Therapist  = require('../../server/models/therapist'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Therapist', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an therapist object', function(done){
      var obj = {
                  discId: 2,
                  first: 'Sally',
                  last: 'Thomas',
                  isTherapist: false
                 },
          therapist = new Therapist(obj);

      expect(therapist).to.be.instanceof(Therapist);
      expect(therapist.isTherapist).to.equal(false);
      done();
    });
  });

  describe('.add', function(){
    it('should add a new therapist', function(done){
      var obj = {
                  discId: 2,
                  first: 'Sally',
                  last: 'Thomas',
                  isTherapist: false
                };
      Therapist.add({org: {id: 1}}, obj, function(err, results){
        expect(results.therapist_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a therapist', function(done){
      Therapist.findById({org: {id: 1}}, 2, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.first).to.equal('John');
        done();
      });
    });
    it('should NOT find a therapist - wrong org', function(done){
      Therapist.findById({org: {id: 2}}, 2, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all therapists by organization', function(done){
      Therapist.all({org: {id: 1}}, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(2);
        done();
      });
    });
  });

  describe('.update', function(){
    it('should update a therapist', function(done){
      var therapist = {
                     id: 1,
                     discId: 1,
                     first: 'Sue',
                     last: 'Thomas',
                     isTherapist: true,
                     photo: 'example.png',
                     productivity: 83,
                     email: 'sue@aol.com',
                     phone: '615-555-2468'
                   };
      Therapist.update({org: {id: 1}}, therapist, function(err, results){
        expect(results.therapist_update).to.equal(true);
        expect(err).to.be.null;
        done();
      });
    });
  });
});
