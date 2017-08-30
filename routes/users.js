const express = require('express');
const response = require('../lib/response');
const User = require('../models/user');

const router = express.Router({ mergeParams: true });
/* GET users listing. */
router.get('/', (req, res) => User.find().then(users => res.status(200).json(response(res, users))));

/* GET user profile page. */
router.get('/profile', (req, res) => res.status(200).json(response(res, 'Logged In')));

module.exports = router;
