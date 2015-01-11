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
				console.log('results', response.result);
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
});
