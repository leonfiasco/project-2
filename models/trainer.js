const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {type: Number, min: 1, max: 5},
  content: { type: String },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

const trainerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  year: String,
  description: String,
  url: String,
  reviews: [reviewSchema],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Trainer', trainerSchema);
