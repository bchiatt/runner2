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

describe('Treatment Plans', function(){
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
	describe('get /txplans', function(){
    it('should get all treatment plans', function(done){
      var options = {
        method: 'get',
        url: '/txplans',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.txPlans.length).to.equal(3);
        done();
      });
    });
  });
	describe('post /txplans', function(){
		it('should create a treatment plan', function(done){
			var options = {
				method: 'post',
				url: '/txplans',
				payload: {
					client_id: 1,
					eval_therapist_id: 2,
					disc_id: 3,
					eval_date: '12/1/2014',
					weekly_day_id: 5,
					frequency_high: 7,
					frequency_low: 5
				},
				headers: {
					cookie: cookie
				}
			};

			server.inject(options, function(response){
				expect(response.result.treatment_plan_add).to.be.ok;
        expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
	describe('pupt /txplans', function(){
		it('should update a treatment plan', function(done){
			var options = {
				method: 'put',
				url: '/txplans',
				payload: {
					id: 1,
					client_id: 1,
					eval_therapist_id: 2,
					disc_id: 3,
					eval_date: '12/1/2014',
					weekly_day_id: 5,
					frequency_high: 7,
					frequency_low: 5
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
