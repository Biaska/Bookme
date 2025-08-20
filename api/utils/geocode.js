const NodeGeocoder = require('node-geocoder');

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

module.exports = geocodeAddress