'use strict';

var cp = require('child_process'),
h  = require('../../helpers/helpers'),
db = h.getdb();

describe('register', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  it('should get register page', function(){
    browser.get('/#/register');
  });
});
