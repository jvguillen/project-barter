const express = require('express');
const response = require('../lib/response');
const Item = require('../models/item');

const router = express.Router({ mergeParams: true });

/* GET items listing. */
router.get('/', (req, res) => {
  Item.find()
    .populate('_user')
    .then(items => res.status(200).json(response(res, items)));
});

router.get('/news', (req, res) => console.log(req.params));

module.exports = router;
