const config = require('../config');

const strategies = {
  google: {
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: config.auth.google.callbackURL,
    setProfile: (profile, accountToken) => ({
      id: profile.id,
      token: accountToken,
      name: profile.displayName,
      email: (profile.emails[0].value || '').toLowerCase(),
    }),
  },
  facebook: {
    clientID: config.auth.facebook.clientID,
    clientSecret: config.auth.facebook.clientSecret,
    callbackURL: config.auth.facebook.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
    setProfile: (profile, accountToken) => ({
      id: profile.id,
      token: accountToken,
      name: `${profile.name.givenName}  ${profile.name.familyName}`,
      email: (profile.emails[0].value || '').toLowerCase(),
    }),
  },
};

module.exports = strategies;
