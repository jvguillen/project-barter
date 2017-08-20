"user strict";

const express = require('express');
const router = express.Router();
const response = require('../lib/response');
const usersModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = req.db;

  usersModel.find().then(function(users) {
    res.status(200).json(response(res, users));
  });

});

module.exports = router;
