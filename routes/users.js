"use strict";

const express = require('express');
const router = express.Router();
const response = require('../lib/response');
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = req.db;

  User.find().then(function(users) {
    res.status(200).json(response(res, users));
  });

});

module.exports = router;
