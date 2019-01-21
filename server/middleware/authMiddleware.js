const usersOnly = ( req, res, next ) => {
  if(!req.session.user){
    res.status(401).json("Please Login")
  } else {
    next()
  }
}

const adminsOnly = (req, res, next) => {
  if(!req.session.user.Admin){
    res.status(403).json("You are not Admin")
  } else {
    next()
  }
}

module.exports = {
  usersOnly,
  adminsOnly
}