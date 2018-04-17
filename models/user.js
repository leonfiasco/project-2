const mongoose = require('mongoose');
//requiring bcrypt
const bcrypt = require('bcrypt');
//to use promises im providing a promise library
mongoose.Promise = require('bluebird');



const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//setting up passwordConfirmation virtual that will not be added to the database
// This function is called in sessions in order to check if the password entered is the same as the password already in the database.
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password); // Throws a validationError if invalid.
};

// This is a virtual property that's temporary stored (not actually put into the database) so we can later use it to confirm if "password confirmation" is indeed the same as "password".
userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation; // Storing passwordConfirmation into _passwordConfirmation in the user schema.
  });

// This is saying that before validating. A pre('validate') hook must be called before a pre('save') hook, because a pre('save') hook will trigger validate.
userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match'); //Creates a ValidationError in controllers/registrations.
  }
  next();
});

// This is encrypting the password. The .isModified works even if the password is being created from nothing. The password is not hashed until this point.
userSchema.pre('save', function HashPassword(next) {
  if(this.isModified('password')) { // I'm not sure why we need isModified here. Is this just so that when we re-seed the database, it will not re-hash the password again? I don't understand why that's a concern.
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)); //Hashes the password and generates the token
  }
  next();
});


module.exports = mongoose.model('User', userSchema);
