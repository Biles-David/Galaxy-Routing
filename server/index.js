require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const massive = require('massive');
const session = require('express-session');
const { json } = require('body-parser');
const path = require('path');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const port = SERVER_PORT

// Controller Functions
const { getUsers, register, login, sessionCheck, logout, addPosition } = require('./controller/userCtrl');
const { getLocations, addCoordinates, getLatLng, getRouteForUser } = require('./controller/locationCtrl');
const { getRouteByRouteId, getRoutes, addToRoute, deleteRoute, updateFullRoute, newRoute, completeStop } = require('./controller/routeCtrl');
const { getChecklist, addToChecklist, deleteItem } = require('./controller/listCtrl');
const { usersOnly, adminsOnly } = require('./middleware/authMiddleware');

const app = express()

app.use( express.static( `${__dirname}/../build` ) );

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
app.get('/users', adminsOnly, getUsers);
app.post('/users/register', register);
app.post('/users/login', login);
app.get('/users/session', sessionCheck);
app.post('/users/logout', logout);
app.post('/users/sessionAdd', addPosition);

//location Endpoints
app.get('/api/locations', getLocations);
app.post('/api/locations/coordinates', addCoordinates);
app.post('/api/locations/exact', getLatLng);
app.get('/api/locations/:id', getRouteForUser);

//Route Endpoints
app.post('/api/routes/:id', getRouteByRouteId);
app.get('/api/routes', getRoutes);
app.post('/api/routes/:id/add', addToRoute);
app.delete('/api/routes/delete/:id', deleteRoute);
app.put('/api/routes/add', updateFullRoute);
app.put('/api/routes/new/route', newRoute);
app.put('/api/routes/complete', completeStop);

//Checklist Endpoints
app.get('/api/checklist', getChecklist);
app.post('/api/checklist/add', addToChecklist);
app.delete('/api/checklist/delete/:id', deleteItem);

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`))