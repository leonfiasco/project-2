// requiring express
const express = require('express');
// creating the app
const app = express();
//setting up the port
const PORT = process.env.PORT || 8000;
//tell express to use express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');
//requiring router
const router = require('./config/router');
//requiring mongoose
const mongoose = require('mongoose');
//requiring bcrypt
const bcrypt = require('bcrypt');
//name of the database
mongoose.connect('mongodb://localhost/kick-frame');
//to use promises im providing a promise library
const Promise = require('bluebird');
mongoose.Promise = Promise;


const schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//setting up passwordConfirmation virtual that will not be added to the database
schema
  .virtual('passwordConfirmation')
  .set(function setPaswordConfirmation(passwordConfirmation){
    //storing the password on the user model temporarily so it can be accessed in pre-validate hook
    //`this.` refers to the user object``
    this._passwordConfirmation = passwordConfirmation;
  });

//setting up a pre-validate hook
schema.pre('validate', function checkPassword(next){
  //checks if password has been modified and if so whether password and passwordConfirmation match
  //if not invalidate passwordConfirmation, so that the validations fails
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');

  //otherwise continue to the next step (validate)
  next();

});


//configuring express to use ejs
app.set('view engine', 'ejs');
//looks for files in my views folder
app.set('views', `${__dirname}/views`);
//tell express to use express-ejs-layouts
app.use(expressLayouts);


//telling express to look the folder for static files
app.use(express.static(`${__dirname}/public`));

//adding request listener to serve home template
app.get('/', (req, res) => res.render('pages/home'));

//tell express to use Router
app.use(router);


app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
