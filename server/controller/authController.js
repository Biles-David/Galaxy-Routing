const bcrypt = require('bcryptjs');

async function register(req, res) {
  const { name, email, password, img } = req.body;
  const employee_number = 999;
  const position = 'N/A';
  const admin = false;

  const db = req.app.get('db');
  let result = await db.check_user([email]);
  console.log('result: ', result[0])
  if(result[0]){
    return res.status(409).json({error: 'Email already in use'})
  }
  let hash = await bcrypt.hash(password, 12);
  // console.log('hash: ', hash)
  // var registeredUser = ''
  // try {
  //   registeredUser = await db.register_user([ name, employee_number, email, position, img, admin, hash ])
  //   console.log('registeredUser: ', registeredUser)
  // } catch {
  //   res.status(400).json(err => console.log(err));
  // }

  const registeredUser = await db.register_user([ name, employee_number, email, position, img, admin, hash ])
  console.log('registeredUser: ', registeredUser[0]);

  if(registeredUser[0]){
    const user = registeredUser[0]
    req.session.user = {
      name: user.name,
      img: user.img,
      admin: user.admin
    };
  }
  return res.status(201).json(req.session.user)
}

module.exports = {
  register
}