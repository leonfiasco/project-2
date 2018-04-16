//linking up the sign up

//requiring the model
const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/index');
}

function createRoute(req, res){
  User
    .create(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      //This is just what mongodb calls a validation error
      // if the stuff the user input does not match the criteria set out in the model.
      if(err.name === 'ValidationError'){
        return res.status(400).render('registrations/index', {message: err.toString()});
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
