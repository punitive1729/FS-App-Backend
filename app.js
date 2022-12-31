const express = require('express');
const app = express();
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorHandler');
const cors = require('cors');
const fileRouter = require('./routes/fileRoutes');
// Cors
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(','),
};

app.use(cors(corsOptions));
app.use('/api/v1/files', fileRouter);
app.all('*', (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);
module.exports = app;
