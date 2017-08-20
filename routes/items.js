const express = require('express');
const response = require('../lib/response');
const Item = require('../models/item');

const router = express.Router();

/* GET items listing. */
router.get('/', (req, res) => {
  Item.find()
    .populate('_user')
    .then(items => res.status(200).json(response(res, items)));
});

module.exports = router;
