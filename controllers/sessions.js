// creating the sessions pages for registering
const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/index');
}

//this is creating a new sessions
function createRoute(req, res) {
  User
    .findOne({email: req.body.email})
    .then((user) =>{
      console.log(user);
      //.validatePassword is defined inside the user model.
      //!user means whether or not the email the user put in already exists.
      if(!user || !user.validatePassword(req.body.password)){
      //return a 400 code if the above fails
        return res.status(401).render('sessions/index', {message: 'Wrong credentials'});
      }
      //This sets the userID onto the session
      req.session.userID = user.id;
      console.log(req.session);
      res.redirect('/');
    });
}

function deleteRoute(req, res){
  //regenerate()wipes clean the session
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
