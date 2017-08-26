const express = require('express');
const passport = require('passport');

const router = express.Router({ mergeParams: true });

// Google routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/',
}));

module.exports = router;
