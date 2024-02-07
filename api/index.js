const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const Connection = require('./db.js');

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

app.get('/', validateAccessToken, async (req, res) => {
  console.log("GET")
  let con = new Connection()
  let create = await con.query(`
    DROP TABLE IF EXISTS Businesses;
    CREATE TABLE Businesses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_number VARCHAR(15),
        street_address VARCHAR(255),
        city VARCHAR(255),
        state VARCHAR(255),
        postal_code VARCHAR(10),
        country VARCHAR(255),
        website VARCHAR(255),
        timezone VARCHAR(50) DEFAULT 'UTC',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  )
  console.log(create)
  con = new Connection()
  let post = await con.query(`INSERT INTO Businesses (name, email, phone_number, street_address, city, state, postal_code, country, website, timezone)
  VALUES
      ('Cosmic Creations', 'info@cosmiccreations.com', '123-456-7890', '42 Galaxy Lane', 'Stellaria', 'Nebula', 'CC123', 'Cosmos', 'www.cosmiccreations.com', 'UTC'),
      ('Astral Aromas', 'contact@astralaromas.com', '987-654-3210', '8 Celestial Road', 'Starville', 'Orion', 'AA987', 'Universe', 'www.astralaromas.com', 'GMT'),
      ('Nebula Nourish', 'hello@nebulanourish.com', '555-123-4567', '15 Galactic Street', 'Nebula City', 'Andromeda', 'NN555', 'Cosmic Cluster', 'www.nebulanourish.com', 'UTC');`)
  console.log(post)
  con = new Connection()
  let q = await con.query('select * from Businesses')
  console.log(q)
  res.status(200).json(q.rows);
});

const server = app.listen(PORT, () => {
  console.log(`Bookme server listening on port ${PORT}`)
});



server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;