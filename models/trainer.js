const mongoose = require('mongoose');


const trainerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  photo: String
  // rating: {type: Number, min: 1, max: 5, default: 3}
  // user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Trainer', trainerSchema);
