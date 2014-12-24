/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Precaution = require('../../server/models/precaution'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Precaution', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a precaution object', function(done){
      var precaution = new Precaution({name: 'example', description: 'more info about example'});

      expect(precaution).to.be.instanceof(Precaution);
      expect(precaution.name).to.equal('example');
      done();
    });
  });

  describe('.add', function(){
    it('should add a new precaution', function(done){
      Precaution.add({org: {id: 1}}, {name: 'example', description: 'more info'}, function(err, results){
        expect(results.precaution_add).to.be.ok;
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT add a new precaution - duplicate', function(done){
      Precaution.add({org: {id: 1}}, {name: 'DM', abbr: 'more info'}, function(err, results){
        expect(err).to.be.ok;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a precaution', function(done){
      Precaution.findById({org: {id: 1}}, 4, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results.name).to.equal('ISO');
        done();
      });
    });
    it('should NOT find a precaution - wrong org', function(done){
      Precaution.findById({org: {id: 2}}, 4, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.all', function(){
    it('should return all precautions by organization', function(done){
      Precaution.all({org: {id: 1}}, function(err, results){
        expect(err).to.be.null;
        expect(results.length).to.equal(6);
        done();
      });
    });
  });

  describe('.update', function(){
    it('should update a precaution', function(done){
      Precaution.update({org: {id: 1}}, {id: 2, name: 'example', description: 'more info'}, function(err, results){
        expect(results.precaution_update).to.equal(true);
        expect(err).to.be.null;
        done();
      });
    });
  });
});
