/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Discipline = require('../../server/models/discipline'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Discipline', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an discipline object', function(done){
      var disc = new Discipline({name: 'Physical Therapy', abbr: 'PT'});

      expect(disc).to.be.instanceof(Discipline);
      expect(disc.abbr).to.equal('PT');
      done();
    });
  });

  describe('.add', function(){
    it('should add a new discipline', function(done){
      Discipline.add({org: {id: 1}}, {name: 'Respiratory Therapy', abbr: 'RT'}, function(err, results){
        expect(results.discipline_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT add a new discipline - duplicate', function(done){
      Discipline.add({org: {id: 1}}, {name: 'Physical Therapy', abbr: 'PT'}, function(err, results){
        expect(err).to.be.ok;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a discipline', function(done){
      Discipline.findById(1, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.abbr).to.equal('OT');
        done();
      });
    });
    it('should NOT find a discipline - not exist', function(done){
      Discipline.findById(5, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all disciplines by organization', function(done){
      Discipline.all({org: {id: 1}}, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(3);
        done();
      });
    });
  });

  describe('.update', function(){
  });
});
