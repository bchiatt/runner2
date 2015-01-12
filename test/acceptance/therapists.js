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

describe('Therapists', function(){
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
	describe('get /therapists', function(){
    it('should get all therapists', function(done){
      var options = {
        method: 'get',
        url: '/therapists',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.therapists.length).to.equal(2);
        done();
      });
    });
  });
	describe('get /therapists/{id}', function(){
		it('should get a therapist', function(done){
			var options = {
				method: 'get',
				url: '/therapists/1',
				payload: {
				},
				headers: {
					cookie: cookie
				}
			};

			server.inject(options, function(response){
				expect(response.result.therapist.phone).to.equal('615-555-1234');
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
	describe('post /therapists', function(){
		it('should create a therapist', function(done){
			var options = {
				method: 'post',
				url: '/therapists',
				payload: {
					disc_id: 2,
					first: 'Sally',
					last: 'Thomas',
					is_therapist: false
				},
				headers: {
					cookie: cookie
				}
			};

			server.inject(options, function(response){
				expect(response.result.therapist_add).to.be.ok;
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
	describe('put /therapists', function(){
		it('should update a therapist', function(done){
			var options = {
				method: 'put',
				url: '/therapists',
				payload: {
					id: 1,
					disc_id: 2,
					first: 'Sally',
					last: 'Thomas',
					is_therapist: false,
					productivity_goal: 83
				},
				headers: {
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
