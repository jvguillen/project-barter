'user strict';

const _ = require('lodash');
const defaults = require('./default.js');

const env = (process.env.NODE_ENV || 'dev');
const config = require(`./${env}.js`);

module.exports = _.merge({}, defaults, config);
