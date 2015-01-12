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

describe('Clients', function(){
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
	describe('get /clients', function(){
    it('should get all clients', function(done){
      var options = {
        method: 'get',
        url: '/clients',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.clients.length).to.equal(3);
        done();
      });
    });
  });
	describe('get /clients/{id}', function(){
		it('should get a client', function(done){
			var options = {
				method: 'get',
				url: '/clients/1',
				payload: {
				},
				headers: {
					cookie: cookie
				}
			};

			server.inject(options, function(response){
				expect(response.result.client.room).to.equal('205A');
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
	describe('post /clients', function(){
		it('should create a client', function(done){
			var options = {
				method: 'post',
				url: '/clients',
				payload: {
					first: 'Sally',
					last: 'Thomas',
					ins_id: 1,
					admit_date: 'Nov 12, 2014',
					room: '213A'
				},
				headers: {
					cookie: cookie
				}
			};

			server.inject(options, function(response){
				expect(response.result.client_add).to.be.ok;
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});
	describe('put /clients', function(){
		it('should update a client', function(done){
			var options = {
				method: 'put',
				url: '/clients',
				payload: {
					id: 1,
					first: 'Sally',
					last: 'Thomas',
					ins_id: 1,
					admit_date: 'Nov 12, 2014',
					room: '213A'
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
