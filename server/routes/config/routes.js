'use strict';

module.exports = [
  {method: 'get',    path: '/{param*}',      config: require('../definitions/general/static')},
  {method: 'post',   path: '/register/org',  config: require('../definitions/orgs/register_org')},
  {method: 'post',   path: '/register/user', config: require('../definitions/users/register_user')},
  {method: 'post',   path: '/login',         config: require('../definitions/users/login')},
  {method: 'delete', path: '/logout',        config: require('../definitions/users/logout')},
  {method: 'get',    path: '/status',        config: require('../definitions/users/status')}
];
