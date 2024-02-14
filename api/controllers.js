const getOneBusiness = async(req, res) => {let con = new Connection()
con = new Connection()
let business = await con.query(queries.businesses.select.one, [req.params.id])
if (business.rowCount === 0) {
  res.status(204).json("");
} else {
  res.status(200).json(business.rows);
}}