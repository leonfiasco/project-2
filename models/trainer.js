const mongoose = require('mongoose');


const trainerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  year: String,
  description: String,
  url: String
});

module.exports = mongoose.model('Trainer', trainerSchema);
