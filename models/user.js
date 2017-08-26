const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {type: String, required: false, min: [3, 'Supply at least 3 characters'] },
  lastname: {type: String, required: false, min: [3, 'Supply at least 3 characters'] },
  age: {type: Number, required: false},
  email: { type: String, required: false, validate: {
      validator: (v) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    },
  },
  google: {
    id: {type: String},
    token: {type: String},
    email: {type: String},
    name: {type: String},
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    username: String,
  },
  status: { type: Boolean, required: false, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
}, { collection: 'user' });

module.exports = mongoose.model('User', userSchema);
