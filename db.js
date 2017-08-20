const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const connection = mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
  useMongoClient: true,
});

module.exports = connection;
