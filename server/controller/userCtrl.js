const bcrypt = require('bcryptjs');

function getUsers (req, res) {
  const db = req.app.get('db');
  db.get_users()
  .then(response => res.json(response))
  .catch(err => console.log(err));
}

async function register (req, res) {
  const db = req.app.get('db');
  const check = await db.check_user([req.body.email])
  if(!check[0]){
    let hash = await bcrypt.hash(req.body.password, 10)
    db.new_user([req.body.name, req.body.email, req.body.img, hash])
    req.session.user = {username: req.body.username, img: req.body.img}
  } else {
    alert("Email already exists")
  }
}

module.exports = {
  getUsers,
  register
}