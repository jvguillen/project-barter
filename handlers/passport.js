/*
* Documentation
* https://www.danielgynn.com/node-auth-part2/
* https://github.com/danielgynn/express-authentication
*/

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const config = require('../config');

module.exports = (passport) => {
  passport.serializeUser((user, done) => { done(null, user.id); });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => { done(err, user); });
  });

  passport.use(new GoogleStrategy({
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: config.auth.google.callbackURL,
  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'google.id': profile.id }, (err, user) => {
        if (err) return done(err); // throw err
        if (!user) {
          const newUser = new User(); // create a new user
          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;
          newUser.save((err) => {
            if (err) throw err;
            return done(null, newUser);
          });
        }

        return done(null, user); // return user founds
      });
    });
  }));
};
