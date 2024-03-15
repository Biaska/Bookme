const NodeGeocoder = require('node-geocoder');
const Connection = require('../db.js');

// Location service
const geocoder = NodeGeocoder({ provider: 'openstreetmap' });

// Get location of one zipcode
const geocodeAddress = async (zipCode) => {
    try {
        const coordinates = await geocoder.geocode(address);
        return coordinates[0];
    } catch (error) {
        console.error(error);
        throw new Error('Failed to geocode address');
    }
};

// get all businesses that are within the users radius
const getBusinessesWithinRadius = async (userLatitude, userLongitude, radius) => {
    let businesses = []; // Placeholder for fetched businesses
    try {
        // Fetch businesses from the database
        const con = new Connection();
        const businessesQuery = await con.query("Select * FROM Businesses"); 
        businesses = businessesQuery.rows

        // Then, for each business, geocode its address and calculate distance
        for (let i = 0; i<businesses.length; i++) {
            console.log(businesses);
            coordinates = await geocoder.geocode({
                country: "USA",
                zipcode: businesses[i].postal_code,
            });
            businesses[i].coodinates = coordinates;
        }

        // Filter businesses within the specified radius

        return businesses;
    } catch (error) {
        console.log(error)
    }
};

module.exports = getBusinessesWithinRadius