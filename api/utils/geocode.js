const NodeGeocoder = require('node-geocoder');
const Connection = require('../db.js');
const haversine = require("haversine");

const geocoder = NodeGeocoder({
  provider: 'openstreetmap',
  httpAdapter: 'https',
  formatter: null,
  timeout: 8000,
  headers: { 'User-Agent': 'Bookme/1.0' }
});

/**
 * Get coordinates of a zipcode
 * @param {string} zipcode
 * @returns
 */
const geocodeAddress = async (zipcode) => {
    try {
        const coordinates = await geocoder.geocode({
            country: "USA",
            zipcode: zipcode,
        });
        return coordinates[0];
    } catch (error) {
        console.error(error);
        throw new Error('Failed to geocode address');
    }
};

/**
 * Pass in coordinates to query database for all businesses within the radius.
 * @param {number} userLatitude
 * @param {number} userLongitude
 * @param {number} radius
 * @returns
 */
const getBusinessesWithinRadius = async (userLatitude, userLongitude, radius) => {
    let businesses = []; // Placeholder for fetched businesses
    try {
        // Fetch businesses from the database
        const con = new Connection();
        const businessesQuery = await con.query("Select * FROM Businesses");
        businesses = businessesQuery.rows

        userLocation = {
            latitude: userLatitude,
            longitude: userLongitude
        }

        let nearbyBusinesses = []
        // Then, for each business, geocode its address and calculate distance
        for (let i = 0; i<businesses.length; i++) {
            // get business coordinates
            coordinates = await geocodeAddress(businesses[i].postal_code);
            businessLocation = {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            };

            // options to return boolean for haversine formula
            // sets the unit and the threshold distance
            options = {
                threshold: radius,
                unit: 'mile'
            }

            // Business is within radius
            if (haversine(userLocation, businessLocation, options)) {
                businesses[i].coordinates = {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                };
                nearbyBusinesses.push(businesses[i]);
            }
        }
        return nearbyBusinesses;
    } catch (error) {
        console.log(error)
    }
};

module.exports = { getBusinessesWithinRadius, geocodeAddress }