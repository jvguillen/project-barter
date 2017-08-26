module.exports = {
  db: {
    host: 'localhost',
    name: 'bartoapp_dev',
    port: '27017',
  },
  auth: {
    google: {
      clientID: '503925882421-6lkiaqssq9vunuene9fdvh7kbf3mdu3e.apps.googleusercontent.com',
      clientSecret: '703eIC3RVfItUn9ykE37H42b',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
  },
  logging: true,
};
