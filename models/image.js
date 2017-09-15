const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
	name: { type:String, required: true },
  path: { type:String, required: true },
	width: { type:String, required: true },
	height: { type:String, required: true },
  featured: { type:Boolean, default: true },
	deleted: { type: Boolean, default: false },
	_item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
}, { collection: 'image' });

const imageModel = mongoose.model('Image', imageSchema);

module.exports = imageModel;
