function getLocations (req, res) {
  const db = req.app.get('db');
  db.get_locations()
  .then(response => res.json(response))
  .catch(err => console.log(err))
};

function addCoordinates (req, res) {
  const db = req.app.get('db');
  db.add_coordinates(req.body.lat, req.body.lng, req.body.store_id)
  .then(response => res.status(200).json(response))
  .catch(err=>console.log(err))
}

module.exports = {
  getLocations,
  addCoordinates
}