/*
* Documentation
* https://www.danielgynn.com/node-auth-part2/
* https://github.com/danielgynn/express-authentication
*/

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const auth = require('../lib/auth');

module.exports = (passport) => {
  passport.serializeUser((user, done) => { done(null, user.id); });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => { done(err, user); });
  });

  passport.use(new GoogleStrategy(auth.google, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'google.id': profile.id }).then((user) => {
        if (!user) {
          const newUser = new User(); // create a new user
          newUser.google = auth.google.setProfile(profile, token);
          return newUser.save().then(doc => done(null, doc)).catch((err) => { throw err; });
        }
        return done(null, user); // return user founds
      }).catch(err => done(err));
    });
  }));

  passport.use(new FacebookStrategy(auth.facebook, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'facebook.id': profile.id }).then((user) => {
        if (!user) {
          const newUser = new User();
          newUser.facebook = auth.facebook.setProfile(profile, token);
          return newUser.save().then(doc => done(null, doc)).catch((err) => { throw err; });
        }
        return done(null, user);
      }).catch(err => done(err));
    });
  }));
};
