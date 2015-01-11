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

describe('Disciplines', function(){
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
	describe('get /disciplines', function(){
    it('should get all disciplines', function(done){
      var options = {
        method: 'get',
        url: '/disciplines',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.disciplines.length).to.equal(3);
        done();
      });
    });
  });
	describe('post /disciplines', function(){
		it('should create a discipline', function(done){
			var options = {
				method: 'post',
				url: '/disciplines',
				payload: {
					name: 'Respiratory Therapy',
					abbr: 'RT'
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
	describe('put /disciplines', function(){
		it('should update a discipline', function(done){
			var options = {
				method: 'put',
				url: '/disciplines',
				payload: {
					id: 1,
					org_id: 1,
					name: 'Respiratory Therapy',
					abbr: 'RT'
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
