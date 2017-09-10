const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String, required:true },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quality: { type: String, required:true },
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
}, { collection: 'item' });

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
