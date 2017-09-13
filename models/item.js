const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String, required:true },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quality: { type: String, required:true },
	tags: [{ type: String, required: false }],
  active: { type: Boolean, default: true },
	deleted: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
}, { collection: 'item' });

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
