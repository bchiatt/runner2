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

describe('Precautions', function(){
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
	describe('get /days', function(){
    it('should get all precautions', function(done){
      var options = {
        method: 'get',
        url: '/precautions',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.precautions.length).to.equal(6);
        done();
      });
    });
  });
	describe('post /precautions', function(){
		it('should create a precaution', function(done){
			var options = {
				method: 'post',
				url: '/precautions',
				payload: {
					name: 'water allergy',
					description: 'cannot touch water'
				},
				headers: {
					cookie: cookie
				}
			};

			server.inject(options, function(response){
				expect(response.result.precaution_add).to.be.ok;
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
	describe('put /precautions', function(){
		it('should update a precaution', function(done){
			var options = {
				method: 'put',
				url: '/precautions',
				payload: {
					id: 1,
					name: 'water allergy',
					description: 'cannot touch water'
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
