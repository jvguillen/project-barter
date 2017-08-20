"user strict";

const express = require('express');
const router = express.Router();
const response = require('../lib/response');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = req.db;
  const collection = db.get('users');

  collection.find({}, {}, function(err, users){

    res.status(200).json(response(res, users));
  });
});

module.exports = router;
