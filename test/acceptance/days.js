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

describe('Days', function(){
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
    it('should get all org defined days', function(done){
      var options = {
        method: 'get',
        url: '/days',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.days.length).to.equal(7);
        done();
      });
    });
  });
	describe('post /days', function(){
		it('should create an org defined day', function(done){
			var options = {
				method: 'post',
				url: '/days',
				payload: {
					num: 9,
					full_name: 'example',
					abbr: 'ex',
					letter: 'e'
				},
				headers: {
					cookie: cookie
				}
			};

			server.inject(options, function(response){
				expect(response.result.day_add).to.be.ok;
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
	describe('put /days', function(){
		it('should update an org defined day', function(done){
			var options = {
				method: 'put',
				url: '/days',
				payload: {
					id: 1,
					org_id: 1,
					num: 1,
					full_name: 'example',
					abbr: 'ex',
					letter: 'e'
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
