'use strict';

module.exports = [
  {method: 'get',    path: '/{param*}',    config: require('../definitions/general/static')},
  {method: 'post',   path: '/register',    config: require('../definitions/users/register')},
  {method: 'post',   path: '/login',       config: require('../definitions/users/login')},
  {method: 'delete', path: '/logout',      config: require('../definitions/users/logout')},
  {method: 'get',    path: '/days',        config: require('../definitions/days/all')},
  {method: 'get',    path: '/disciplines', config: require('../definitions/disciplines/all')},
  {method: 'get',    path: '/insurances',  config: require('../definitions/insurances/all')},
  {method: 'get',    path: '/precautions', config: require('../definitions/precautions/all')},
  {method: 'post',   path: '/precautions', config: require('../definitions/precautions/create')},
  {method: 'put',    path: '/precautions', config: require('../definitions/precautions/update')},
  {method: 'get',    path: '/therapists',  config: require('../definitions/therapists/all')},
  {method: 'get',    path: '/clients',     config: require('../definitions/clients/all')},
  {method: 'get',    path: '/txplans',     config: require('../definitions/txplans/all')},
  {method: 'get',    path: '/treatments',  config: require('../definitions/treatments/all')},
  {method: 'get',    path: '/workscheds',  config: require('../definitions/workscheds/all')},
  {method: 'get',    path: '/status',      config: require('../definitions/users/status')}
];
