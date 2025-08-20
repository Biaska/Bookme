function errorHandler(err, req, res, _next) {
  // Known application error
  const status = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;

  const payload = {
    error: err.name || 'Error',
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.stack = err.stack;
  }

  console.error(err);

  res.status(status).json(payload);
}

module.exports = { errorHandler };
