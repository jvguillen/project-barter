const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: String,
  images: [String],
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quality: String,
  active: Boolean,
  updated: { type: Date, default: Date.now },
}, { collection: 'item' });

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
