const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const Connection = require('./db.js');
const queries = require('./sql-queries.cjs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const NodeGeocoder = require('node-geocoder');
const { getBusinessesWithinRadius, geocodeAddress }  = require('./utils/geocode.js');
const getBusinessServices = require('./utils/servicesKeywordSearch.js');

// Location service
const geocoder = NodeGeocoder({ provider: 'openstreetmap' });

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
    let q = await con.query('select * from Businesses')
    
    res.status(200).json(q.rows);
});

// Get one business
app.get('/businesses/:id', validateAccessToken, async (req, res) => {
  console.log("GET ONE BUSINESS");

  let con = new Connection()
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
  let q = await con.query('select * from Services')

  res.status(200).json(q.rows);
});


// Create new service
app.post('/services', validateAccessToken, async (req, res) => {
  console.log("POST Service");

  try {
    // Get query parameters from request
  const qParams = [] 
  Object.entries(req.body).forEach((entry) => {
    const [key, value] = entry;
    qParams.push(value);
  });

  let con = new Connection();
  let service = await con.query(queries.services.insert.one, qParams)

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal Service Error"})
  }
  res.status(200).json("New service inserted.")
});

// Get one service
app.get('/services/:id', async (req, res) => {
  console.log("GET One Service");

  let con = new Connection()
  let service = await con.query(queries.services.select.one, [req.params.id])
  
  if (service.rowCount === 0) {
    res.status(204).json("No businesses found");
  } else {
    res.status(200).json(service.rows[0]);
  }
});

// Create a schedule
app.post('/schedules', validateAccessToken, async (req, res) => {
  console.log("Attempting to create schedule...")
  try {
    let data = req.body
    const response = await fetch("http://24.21.81.89:10441/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const serverResponse = await response.json();4
    console.log(serverResponse);

    if (response.status === 500) {
      console.log(serverResponse)
      res.status(500).json({ 
        error: 'api error',
        message: serverResponse,
     })
    }
    // Set Access-Control-Allow-Origin header to allow cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(serverResponse)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// User Search for nearby services
app.post('/search', async (req, res) => {
  try {
      let coordinates;
      const { zipCode, radius, keyword } = req.body;

      // get user coordinates
      if (zipCode) {
          coordinates = await geocodeAddress(zipCode);
      } else {
          return res.status(400).json({ error: 'Zip code is required' });
      }
      const userLatitude = coordinates.latitude;
      const userLongitude = coordinates.longitude;

      // get all nearby businesses
      const businesses = await getBusinessesWithinRadius(userLatitude, userLongitude, radius)

      // seperate ids
      let businessIds = []
      for (let i=0; i<businesses.length; i++) {
        businessIds.push(businesses[i].id);
      }

      const services = await getBusinessServices(businessIds, keyword)
      res.status(200).json(services); 

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

// USED FOR DEVELOPMENT
// Reset the database
app.get('/reset', validateAccessToken, async (req, res) => {
  console.log("RESET DATABASE")
  let con = new Connection()
  await con.resetDatabase()
  res.status(200).json("Database Reset")
});


module.exports = app