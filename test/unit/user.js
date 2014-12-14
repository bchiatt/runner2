/* jshint expr:true */

'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/user'),
    cp        = require('child_process');

describe('User', function(){
  before(function(done){
    done();
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', ['runner2-test'], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new User object', function(){
      var u = new User({username:'bob'});
      expect(u).to.be.instanceof(User);
    });
  });

  // describe('.register', function(){
  //   it('should register a user', function(done){
  //     User.register({email:'x@y.com', password:'123'}, function(err, user){
  //       expect(user).to.be.ok;
  //       done();
  //     });
  //   });
  //   it('should NOT register a user - dupe email', function(done){
  //     User.register({email:'bob@aol.com', password:'123'}, function(err, user){
  //       expect(user).to.be.undefined;
  //       done();
  //     });
  //   });
  // });
  //
  // describe('.login', function(){
  //   it('should login a user', function(done){
  //     User.login({email:'bob@aol.com', password:'1234'}, function(err, user){
  //       expect(user).to.be.ok;
  //       done();
  //     });
  //   });
  //   it('should NOT login a user - bad email', function(done){
  //     User.login({email:'wrong@aol.com', password:'1234'}, function(err, user){
  //       expect(user).to.be.undefined;
  //       done();
  //     });
  //   });
  //   it('should NOT login a user - bad password', function(done){
  //     User.login({email:'bob@aol.com', password:'wrong'}, function(err, user){
  //       expect(user).to.be.undefined;
  //       done();
  //     });
  //   });
  // });
});
