const express = require('express');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const { env } = require('./config');
const { errorHandler } = require('./middlewares/error');

const app = express();

app.use(express.json());
app.set('json spaces', 2);

app.use(
  cors({
    origin: env.CLIENT_ORIGIN_URL,
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400,
  })
);

// Auth
const validateAccessToken = auth({
  issuerBaseURL: `https://${env.AUTH0_DOMAIN}`,
  audience: env.AUTH0_AUDIENCE,
});

// Health check
app.get('/', (_req, res) => res.status(200).json('Bookme API'));

// Routes
const routes = require('./routes')(validateAccessToken);
app.use(routes);

// 404 fallthrough
app.use((_req, _res, next) => {
  const { AppError } = require('./utils/http');
  next(new AppError(404, 'Not Found'));
});

app.use(errorHandler);

module.exports = app;
