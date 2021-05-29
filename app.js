const express = require('express');
const createError = require('http-errors');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.urlencoded({ extended: 'true' })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json
app.use(express.json({ type: 'application/vnd.api+json' }));

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

const roleRoutes = require('./roles');

app.use('/', roleRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(async (err, req, res, next) => {
  console.error(err);
  delete err.error;
  err.time = new Date();
  if (err.status) res.status(err.status).json(err);
  else res.status(500).json({ err, msgEn: 'Something went wrong!' });
  next(err);
});

module.exports = app;
