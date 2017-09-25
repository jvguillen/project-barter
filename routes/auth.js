const express = require('express');
const passport = require('passport');

const router = express.Router({ mergeParams: true });

// Google routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/api/users/profile',
  failureRedirect: '/',
}));

// Facebook routes
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/api/users/profile',
  failureRedirect: '/',
}));


module.exports = router;
