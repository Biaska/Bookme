const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const Connection = require('./db.js');
const queries = require('./sql-queries.cjs')

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


// Auth0 get token to validate server
const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

// cors config
app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);

// Get all businesses
app.get('/businesses', validateAccessToken, async (req, res) => {
    console.log("GET Businesses")

    let con = new Connection()
    con = new Connection()
    let q = await con.query('select * from Businesses')
    
    res.status(200).json(q.rows);
});

// Get one business
app.get('/businesses/:id', validateAccessToken, async (req, res) => {
  console.log("GET ONE BUSINESS");

  let con = new Connection()
  con = new Connection()
  let business = await con.query(queries.businesses.select.one, [req.params.id])
  
  if (business.rowCount === 0) {
    res.status(204).json("No businesses found");
  } else {
    res.status(200).json(business.rows);
  }
});

// Create new business
app.post('/businesses', validateAccessToken, async (req, res) => {
  console.log("POST BUSINESS");

  // Get query parameters from request
  const qParams = [] 
  Object.entries(req.body).forEach((entry) => {
    const [key, value] = entry;
    qParams.push(value);
  });

  let con = new Connection();
  con = new Connection();
  let business = await con.query(queries.businesses.insert.one, qParams);
  
  // Error querying db
  if (business instanceof Error) {
    res.status(400).json(business);
  }

  res.status(200).json("New business inserted.");
});

// Get all of one businesses services
app.get('/businessServices/:id', validateAccessToken, async (req, res) => {
  console.log("GET Business Services");

  let con = new Connection()
  con = new Connection()

  let business = await con.query(queries.services.select.business, [req.params.id])
  
  // If row not found
  if (business.rowCount === 0) {
    res.status(204).json("Business does not have services. ");
  } else {
    res.status(200).json(business.rows);
  }
});


// Get all services
app.get('/services', validateAccessToken, async (req, res) => {
  console.log("GET")

  let con = new Connection()
  con = new Connection()
  let q = await con.query('select * from Services')

  res.status(200).json(q.rows);
});


// Create new service
app.post('/services', validateAccessToken, async (req, res) => {
  console.log("POST Service");

  // Get query parameters from request
  const qParams = [] 
  Object.entries(req.body).forEach((entry) => {
    const [key, value] = entry;
    qParams.push(value);
  });

  let con = new Connection();
  con = new Connection();
  let service = await con.query(queries.services.insert.one, qParams)

  // Error calling db
  if (service instanceof Error) {
    res.status(400).json(service)
  }

  res.status(200).json("New service inserted.")
});

// USED FOR DEVELOPMENT
// Reset the database
app.get('/reset', validateAccessToken, async (req, res) => {
  console.log("RESET DATABASE")
  let con = new Connection()
  await con.resetDatabase()
  res.status(200).json("Database Reset")
});


module.exports = app