const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  age: Number,
  email: { type: String, required: true },
  active: Boolean,
  updated: { type: Date, default: Date.now },
}, { collection: 'user' });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
