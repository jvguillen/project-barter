'use strict';

const express = require('express');
const router = express.Router();
const response = require('../lib/response');
const Item = require('../models/item');

/* GET items listing. */
router.get('/', function(req, res, next) {
  const db = req.db;

  Item.find().then(function(items) {
    res.status(200).json(response(res, items));
  });

});

module.exports = router;
