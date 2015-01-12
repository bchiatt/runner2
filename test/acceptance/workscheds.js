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

describe('Work Schedules', function(){
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
	describe('get /workscheds', function(){
    it('should get all work schedules', function(done){
      var options = {
        method: 'get',
        url: '/workscheds',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.workScheds.length).to.equal(3);
        done();
      });
    });
  });
	describe('delete /workscheds/{id}', function(){
		it('should delete a work schedule', function(done){
			var options = {
				method: 'delete',
				url: '/workscheds/1',
				payload: {
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
	describe('post /workscheds', function(){
		it('should create a work schedule', function(done){
			var options = {
				method: 'post',
				url: '/workscheds',
				payload: {
					day_id: 3,
					therapist_id: 1,
					start_time: '6:00:00',
					end_time: '8:00:00',
					is_late_eval: false
				},
				headers: {
					cookie: cookie
				}
			};

			server.inject(options, function(response){
				expect('work_schedule_add').to.be.ok;
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
	describe('put /workscheds', function(){
		it('should update a work schedule', function(done){
			var options = {
				method: 'put',
				url: '/workscheds',
				payload: {
					id: 2,
					day_id: 3,
					therapist_id: 1,
					start_time: '6:00:00',
					end_time: '8:00:00',
					is_late_eval: false
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
