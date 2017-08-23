const express = require('express');
const passport = require('passport');
const response = require('../lib/response');
const User = require('../models/user');

const router = express.Router();
/* GET users listing. */
router.get('/', (req, res) => User.find().then(users => res.status(200).json(response(res, users))));

module.exports = router;
