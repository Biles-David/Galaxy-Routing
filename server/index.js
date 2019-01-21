require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const massive = require('massive');
const session = require('express-session');
const { json } = require('body-parser');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const port = SERVER_PORT

// Controller Functions
const { getUsers, register, login } = require('./controller/userCtrl');
const { getLocations, addCoordinates } = require('./controller/locationCtrl');
const { getRouteByRouteId, getRoutes, addToRoute } = require('./controller/routeCtrl');
const { usersOnly, adminsOnly } = require('./middleware/authMiddleware');

const app = express()

app.use(json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

massive(CONNECTION_STRING)
.then(db => app.set('db', db))
.catch(err => console.log(err));

// User Endpoints
app.get('/users', getUsers);
app.post('/users/register', register);
app.post('/users/login', login);

//location Endpoints
app.get('/api/locations', getLocations)
app.post('/api/locations/coordinates', addCoordinates)

//Route Endpoints
app.post('/api/routes/:id', getRouteByRouteId)
app.get('/api/routes', getRoutes)
app.post('/api/routes/:id/add', addToRoute)

app.listen(port, () => console.log(`Listening on port ${port}`))