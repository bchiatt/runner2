'use strict';

var h  = require('../../helpers/helpers');

describe('register', function(){
  beforeEach(function(done){
		browser.get('/#/register');
		done();
  });

  it('should get register page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('Register');
  });

  it('should register a new user', function(){
    element(by.model('user.orgName')).sendKeys('ABCD' + h.random(5000));
    element(by.model('user.city')).sendKeys('Amboy');
    element(by.model('user.state')).sendKeys('IN');
    element(by.model('user.first')).sendKeys('silly');
    element(by.model('user.last')).sendKeys('billy');
    element(by.model('user.username')).sendKeys('billy' + h.random(5000));
    element(by.model('user.password')).sendKeys('1234');
    element(by.css('button[ng-click=\'register()\']')).click();

    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('Login');
  });
});
