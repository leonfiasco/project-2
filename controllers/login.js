
function sessionCreate(req, res, next){
  User
    .findOne({ email: req.body.email })
    .then(user => {
    // if statement for if the user cant be found or did not supply a valid password
      if(!user || !user.validatePassword(req.body.password)) {
        //sends user back to login page
        return res.redirect('/login');
      }
      // storing the user's ID in the session cookie
      req.session.useId = user._id;
      //otherwise send user to homepage
      res.redirect('/');
    })
    .catch(next);
}





function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));




  module.exports = {
    new:,
    create: sessionCreate,
    delete: sessionsDelete
  }
