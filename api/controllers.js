const db = require('./db.js');

const getOneBusiness = async(req, res) => {let con = new Connection()
  let business = await db.query(queries.businesses.select.one, [req.params.id])
  if (business.rowCount === 0) {
    res.status(204).json("");
  } else {
    res.status(200).json(business.rows);
}}

const RADIUS_M_PER_MILE = 1609.344;

/**
 * Pass in coordinates to query database for all businesses within the radius.
 * @param {number} userLatitude
 * @param {number} userLongitude
 * @param {number} radius
 * @returns
 */
async function getBusinessesWithinRadius(userLatitude, userLongitude, radiusMiles) {
  const radiusMeters = Number(radiusMiles) * RADIUS_M_PER_MILE;

  const sql = `
    SELECT id, name, email, phone_number, street_address, city, state, postal_code,
           country, website, timezone, latitude, longitude
    FROM businesses
    WHERE earth_box(ll_to_earth($1, $2), $3) @> ll_to_earth(latitude, longitude)
      AND earth_distance(ll_to_earth($1, $2), ll_to_earth(latitude, longitude)) <= $3
  `;


  const { rows } = await db.query(sql, [userLatitude, userLongitude, radiusMeters]);
  return rows;
};

module.exports = {
  getOneBusiness,
  getBusinessesWithinRadius

}