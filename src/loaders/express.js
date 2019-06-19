const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../routes');

const app = express();

// It shows the real origin IP in the heroku or Cloudwatch logs
app.enable('trust proxy');

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());

// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json());

// Load routes
routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers
app.use((err, req, res, next) => {
  /**
   * Handle 401 thrown by express-jwt library
   */
  if (err.name === 'UnauthorizedError') {
    return res
      .status(err.status)
      .send({ message: err.message })
      .end();
  }
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message
    }
  });
});

if (process.env.NODE_ENV !== 'test') {
  console.log('✌️ Express loaded');
}

module.exports = app;
