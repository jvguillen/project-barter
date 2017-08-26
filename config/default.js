module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  oauth: {
    google: {
      clientID: '503925882421-6lkiaqssq9vunuene9fdvh7kbf3mdu3e.apps.googleusercontent.com',
      secret: '703eIC3RVfItUn9ykE37H42b',
    },
  },
  logging: false,
};
