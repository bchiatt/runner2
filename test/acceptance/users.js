/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
cp         = require('child_process'),
h          = require('../helpers/helpers'),
server     = require('../../server/index'),
Lab        = require('lab'),
lab        = exports.lab = Lab.script(),
describe   = lab.describe,
it         = lab.it,
beforeEach = lab.beforeEach,
db         = h.getdb();

describe('Users', function(){
  var cookie;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: '1234'
        }
      };

      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        done();
      });
    });
  });

  describe('post /register', function(){
    it('should register a new user and org', function(done){
      var options = {
        method: 'post',
        url: '/register',
        payload: {
          orgName: 'NSS',
          city: 'Nashville',
          state: 'TN',
          first: 'Sam',
          last: 'Iam',
          username: 'sam',
          password: '456'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should confirm org is registered', function(done){
      var options = {
        method: 'post',
        url: '/register',
        payload: {
          orgName: 'trevecca',
          city: 'Nashville',
          state: 'TN'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
    it('should confirm org is NOT registered', function(done){
      var options = {
        method: 'post',
        url: '/register',
        payload: {
          orgName: 'NSS',
          city: 'Nashville',
          state: 'TN'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should NOT register a new user and org - user exists', function(done){
      var options = {
        method: 'post',
        url: '/register',
        payload: {
          orgName: 'NSS',
          city: 'Nashville',
          state: 'TN',
          first: 'Bob',
          last: 'Tom',
          username: 'bob',
          password: '1234'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
    it('should NOT register a new user and org - org exists', function(done){
      var options = {
        method: 'post',
        url: '/register',
        payload: {
          orgName: 'Trevecca',
          city: 'Nashville',
          state: 'TN',
          first: 'Bob',
          last: 'Tom',
          username: 'bob',
          password: '1234'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('post /login', function(){
    it('should login a user', function(done){
      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: '1234'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.username).to.equal('bob');
        done();
      });
    });
  });

  describe('delete /logout', function(){
    it('should logout a user', function(done){
      var options = {
        method: 'delete',
        url: '/logout',
        headers:{
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /status', function(){
    it('should get status for a user', function(done){
      var options = {
        method: 'get',
        url: '/status',
        headers:{
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
