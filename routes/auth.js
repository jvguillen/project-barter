const express = require('express');
const passport = require('passport');
const response = require('../lib/response');
const User = require('../models/user');

const router = express.Router({ mergeParams: true });
/* GET users listing. */
router.get('/', (req, res) => res.status(200).json(response(res, 'Oops! Something went wrong.')));

// Google routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/',
}));

module.exports = router;
