const express = require('express');
const response = require('../lib/response');
const User = require('../models/user');

const router = express.Router();
/* GET users listing. */
router.get('/', (req, res) => User.find().then(users => res.status(200).json(response(res, users))));

// Google routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/',
}));

module.exports = router;
