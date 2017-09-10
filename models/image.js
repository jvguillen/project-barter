const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  name: { type:String, required: true },
  _item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  featured: { type:Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
}, { collection: 'image' });

const imageModel = mongoose.model('Image', imageSchema);

module.exports = imageModel;
