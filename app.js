const express = require('express');
const app = express();
const AppError = require('./utils/AppError');
const bodyParser = require('body-parser');
const globalErrorHandler = require('./controller/errorHandler');
const cors = require('cors');
const fileRouter = require('./routes/fileRoutes');
const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 5,
  windowMS: 600000,
  message: 'You cannot make any more requests',
});

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/files', fileRouter);
app.all('*', (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);
module.exports = app;
