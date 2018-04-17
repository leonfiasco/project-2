//linking up the sign up

//requiring the model
const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/index');
}

function createRoute(req, res, next){
  User
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch((next));
  //This is just what mongodb calls a validation error
  // if the stuff the user input does not match the criteria set out in the model.

  // if(err.name === 'ValidationError'){
  //   return res.status(400).render('registrations/index', {message: err.toString()});
  // }

  function registrationsCreate(req, res){
    User
      .create(req.body)
      .then((user) => {
        req.flash('info', `Thanks for registering, ${user.username}! please login.`);
        return res.redirect('/login');
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          return res.status(400).render('registrations/new', { message: 'Passwords do not match'});
        }
        res.status(500).end();
      });
  }

}

module.exports = {
  new: newRoute,
  create: createRoute
};
