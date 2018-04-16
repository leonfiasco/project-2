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

schema.pre('save', function hashPassword(next){
  //if password is modified, it needs to be hashed
  if(this.ismodified('password')) {
    // hashing password with bcrypt and store the hashed password on the user object
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  //continue to the step
  next();


});

module.exports = mongoosoe.model('User', userSchema);
