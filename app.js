const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Crossdomain module
const cors = require('cors');

// oAuth
const passport = require('passport');

// express session handle
const session = require('express-session');

const response = require('./lib/response');

// require routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');
const items = require('./routes/items');
// add new routes before this line

const app = express();
const db = require('./db');

db.then((conn) => {
  // Make db accessible to our routes
  app.use((req, res, next) => {
    req.db = conn;
    next();
  });
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(cors({
  allow : {
    origin: '*',
    methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
    headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
  }
}));
app.use(helmet());

// oAuth
app.use(session({ secret: 'shhsecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./handlers/passport')(passport);

// enable routes
app.use('/api/:version/', index);
app.use('/api/:version/auth', auth);
app.use('/api/:version/users', users);
app.use('/api/:version/items', items);
// add new routes before this line

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(response(res, null, { errorMessage: err.message, stack: err.stack }));
});

module.exports = app;
