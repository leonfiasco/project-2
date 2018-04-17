const Trainer = require('../models/trainer');

function trainerIndex(req, res) {
  Trainer
    .find()
    .exec()
    .then(trainers => {
      res.render('trainers/index', { trainers });
    });
}

module.exports = {
  index: trainerIndex
};
