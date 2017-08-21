const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const response = require('./lib/response');

// require routes
const index = require('./routes/index');
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// enable routes
app.use('/', index);
app.use('/users', users);
app.use('/items', items);
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
