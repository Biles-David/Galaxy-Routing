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
  .then(response =>  res.status(200).json(response))
  .catch(err => console.log(err))
}

function deleteRoute(req, res) {
  const db = req.app.get('db');
  db.delete_route(req.params.id)
  .then(response =>  res.status(200).json(response))
  .catch(err => console.log(err))
}

function updateFullRoute(req, res) {
  const db = req.app.get('db');
  db.routes.insert(req.body.route, function(err, res){});
}

function newRoute(req, res) {
  const db = req.app.get('db');
  const { route_id, route_name, location_id, user_id, reasons, route_order } = req.body
  db.new_route(route_id, route_name, location_id, user_id, reasons, route_order)
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

function completeStop(req, res) {
  const db = req.app.get('db');
  db.complete_stop(req.body.route_id, req.body.location_id)
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

module.exports = {
  getRouteByRouteId,
  getRoutes,
  addToRoute,
  deleteRoute,
  updateFullRoute,
  newRoute,
  completeStop
}