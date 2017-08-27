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
    facebook: {
      clientID: '339206526491099',
      clientSecret: '41a27fa7bfe36de4f4ce618ecd13a768',
      callbackURL: 'http://localhost:3000/api/1/auth/facebook/callback',
    },
  },
  logging: true,
};
