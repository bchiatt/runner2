/* jshint expr:true */

'use strict';

var expect = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
Org        = require('../../server/models/org'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Org', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an org object', function(done){
      var org = new Org({orgName: 'NSS', city: 'Nashville', state:'TN'});

      expect(org).to.be.instanceof(Org);
      expect(org.city).to.equal('Nashville');
      done();
    });
  });

  // describe('.register', function(){
  //   it('should register a new user', function(done){
  //     User.register({username:'sam', password:'1234', avatar:'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'}, function(err, b, c){
  //       expect(err).to.be.null;
  //       done();
  //     });
  //   });
  //   it('should NOT register a new user - duplicate', function(done){
  //     User.register({username:'bob', password:'1234', avatar:'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'}, function(err){
  //       expect(err).to.be.ok;
  //       done();
  //     });
  //   });
  // });
  //
  // describe('.login', function(){
  //   it('should login a user', function(done){
  //     User.login({username:'bob', password:'1234'}, function(user){
  //       expect(user.username).to.equal('bob');
  //       done();
  //     });
  //   });
  //   it('should NOT login a user - bad username', function(done){
  //     User.login({username:'wrong', password:'1234'}, function(user){
  //       expect(user).to.be.undefined;
  //       done();
  //     });
  //   });
  //   it('should NOT login a user - bad password', function(done){
  //     User.login({username:'bob', password:'wrong'}, function(user){
  //       expect(user).to.be.undefined;
  //       done();
  //     });
  //   });
  // });
});
