const express = require('express');
const app = express();
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorHandler');
const cors = require('cors');
const fileRouter = require('./routes/fileRoutes');

app.use(cors());
app.use('/api/v1/files', fileRouter);
app.all('*', (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);
module.exports = app;
