const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   rating: {type: Number, min: 1, max: 5},
//   content: { type: String },
//   user: {type: mongoose.Schema.ObjectId, ref: 'User'}
// });

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
});


const trainerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  url: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  comments: [commentSchema]
  // reviews: [reviewSchema],

});

module.exports = mongoose.model('Trainer', trainerSchema);
