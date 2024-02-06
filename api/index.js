const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");


dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;


app.use(express.json());
app.set("json spaces", 2);

const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});


app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);

app.get('/', validateAccessToken, (req, res) => {
  console.log("GET")
  message = 'A message from CS361';
  res.status(200).json(message);
});

const server = app.listen(PORT, () => {
  console.log(`Bookme server listening on port ${PORT}`)
});



server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;