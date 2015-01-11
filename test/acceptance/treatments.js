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

describe('Treatments', function(){
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
	describe('get /treatments', function(){
    it('should get all treatments', function(done){
      var options = {
        method: 'get',
        url: '/treatments',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.treatments.length).to.equal(4);
        done();
      });
    });
  });
	describe('post /treatments', function(){
		it('should add a treatment', function(done){
			var options = {
				method: 'post',
				url: '/treatments',
				payload: {
					client_id: 1,
					therapist_id: 1,
					disc_id: 1,
					ins_id: 1,
					mins_expected: 60,
					mins_actual: 45,
					day_count: 23,
					tx_date: 'Mar 13, 2015',
					is_note_done: true,
					is_archived: false
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
	describe('delete /treatments/{id}', function(){
		it('should delete a treatment', function(done){
			var options = {
				method: 'delete',
				url: '/treatments/1',
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
});
