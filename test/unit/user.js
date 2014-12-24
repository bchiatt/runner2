/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
User       = require('../../server/models/user'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('User', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an user object', function(done){
      var user = new User({first: 'Bob', last: 'Paul', username:'bob'});

      expect(user).to.be.instanceof(User);
      expect(user.username).to.equal('bob');
      done();
    });
  });

  describe('.register', function(){
    it('should register a new user', function(done){
      User.register({username:'sam', password:'1234', first:'Sam', last:'Smith'}, 1, function(err){
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT register a new user - duplicate', function(done){
      User.register({username:'bob', password:'1234', first:'Bob', last:'Tom'}, 1, function(err){
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT register a new user - no Org', function(done){
      User.register({username:'bob', password:'1234', first:'Bob', last:'Tom'}, 7, function(err){
        expect(err).to.be.ok;
        done();
      });
    });
  });

  describe('.login', function(){
    it('should login a user', function(done){
      User.login({username:'bob', password:'1234'}, function(err, user){
        expect(err).to.be.null;
        expect(user.username).to.equal('bob');
        done();
      });
    });
    it('should NOT login a user - bad username', function(done){
      User.login({username:'wrong', password:'1234'}, function(err, user){
        expect(err).to.be.null;
        expect(user).to.be.null;
        done();
      });
    });
    it('should NOT login a user - bad password', function(done){
      User.login({username:'bob', password:'wrong'}, function(err, user){
        expect(err).to.be.null;
        expect(user).to.be.null;
        done();
      });
    });
  });
});
