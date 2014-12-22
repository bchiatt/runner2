/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Day        = require('../../server/models/day'),
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
    it('should create an day object', function(done){
      var day = new Day({name: 'Xyz123', abbr: 'Xyz', letter: 'Z'});

      expect(day).to.be.instanceof(Day);
      expect(day.abbr).to.equal('Xyz');
      done();
    });
  });

  describe('.add', function(){
    it('should add a new day', function(done){
      Day.add({org: {id: 1}}, {name: 'Xyz123', abbr: 'Xyz', letter: 'Z'}, function(err, results){
        expect(results.day_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT add a new day - duplicate', function(done){
      Day.add({org: {id: 1}}, {name: 'Monday', abbr: 'Mon', letter: 'M'}, function(err, results){
        expect(err).to.be.ok;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a day', function(done){
      Day.findById(1, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.abbr).to.equal('Mon');
        done();
      });
    });
    it('should NOT find a day - not exist', function(done){
      Day.findById(9, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all days by organization', function(done){
      Day.all({org: {id: 1}}, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(7);
        done();
      });
    });
  });

  describe('.update', function(){
    it('should update a day', function(done){
      Day.update({org: {id: 1}}, {name: 'Xyz123', abbr: 'Xyz', letter: 'Z'}, function(err, results){
        expect(results).to.equal(1);
        expect(err).to.be.null;
        done();
      });
    });
  });
});
