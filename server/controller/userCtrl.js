const bcrypt = require('bcryptjs');

function getUsers (req, res) {
  const db = req.app.get('db');
  db.get_users()
  .then(response => res.json(response))
  .catch(err => console.log(err));
}

async function register(req, res) {
  const { first_name, last_name, email, password, img } = req.body;
  const employee_number = 999;
  const position = 'N/A';
  const admin = false;

  const db = req.app.get('db');
  // console.log('req.body: ', req.body)
  let result = await db.check_user([email]);
  if(result[0]){
    return res.status(409).json({error: 'Email already in use'})
  }
  let hash = await bcrypt.hash(password, 12);
  const registeredUser = await db.register_user([ first_name, last_name, employee_number, email, position, img, admin, hash ])
  if(registeredUser[0]){
    const user = registeredUser[0]
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      img: user.img,
      admin: user.admin,
      id: user.id,
      position: 0
    };
  }
  return res.status(201).json(req.session.user)
}

async function login ( req, res ) {
  const db = req.app.get('db');
  const log = await db.check_user([req.body.email])
  if(!log[0]) {
    res.status(401).json({error: "User or Password Incorrect"});
  } else {
    let check = await bcrypt.compare(req.body.password, log[0].hash)
    if(!check){
      res.status(410).json({error: "User or Password Incorrect"})
    } else {
      let user = log[0]
      req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        img: user.img,
        admin: user.admin,
        id: user.id,
        position: 0
      };
      res.status(200).json(req.session.user)
    }
  }
}

function sessionCheck ( req, res ) {
  res.status(200).json(req.session.user)
}

function addPosition ( req, res ) {
  req.session.user.position += 1
  res.status(200).json(req.session.user)
}

async function logout ( req, res ) {
  req.session.destroy();
  return res.sendStatus(200)
}

module.exports = {
  getUsers,
  register,
  login,
  sessionCheck,
  logout,
  addPosition
}