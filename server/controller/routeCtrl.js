function getRouteByRouteId (req, res) {
  const db = req.app.get('db');
  db.get_route_by_route_id(req.params.id)
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

function getRoutes (req, res) {
  const db = req.app.get('db');
  db.get_routes()
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

function addToRoute (req, res) {
  const db = req.app.get('db');
  const {route_id, route_name, location_id, user_id, reasons, route_order} = req.body
  db.add_to_route(route_id, route_name, location_id, user_id, reasons, route_order)
  .then(response => console.log(response) || res.status(200).json(response))
  .catch(err => console.log(err))
}

module.exports = {
  getRouteByRouteId,
  getRoutes,
  addToRoute
}