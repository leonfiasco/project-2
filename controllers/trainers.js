const Trainer = require('../models/trainer');

function trainerIndex(req, res) {
  Trainer
    .find()
    .exec()
    .then(trainers => {
      res.render('trainers/index', { trainers });
    });
}

function trainersShow(req, res){
  Trainer
    .findById(req.params.id)
    .exec()
    .then(trainer => res.render('trainers/show', {trainer}));

}

function trainersNew(req, res){
  res.render('trainers/new', {error: null});
}

function trainersCreate(req, res) {
  // req.body.user = req.currentUser;

  Trainer
  //getting the entire object of the request
    .create(req.body)
    .then(() => res.redirect('/trainers'))
    // Catches the validation error created in the trainer model
    .catch((error) => {
      if(error.name === 'ValidationError') {
        //everything after this will be terminated
        return res.badRequest('/trainers/new', error.toString());
      }
    });
}

function trainersEdit(req, res){
  Trainer
  //body-parser allows this to be used
    .findById(req.params.id)
    .exec()
    .then(trainer => res.render('trainers/edit', {trainer}));
}

function trainersUpdate(req, res){
  Trainer
    .findById(req.params.id)
    .exec()
    .then(trainer => {
      // assigns the contents of req.body to album
      trainer = Object.assign(trainer, req.body);
      return trainer.save();
    })
    .then(trainer => res.redirect(`/trainers/${trainer._id}`));
}

function trainersDelete(req, res){
  Trainer
    .findById(req.params.id)
    .exec()
    .then(trainer => trainer.remove())
    .then(() => res.redirect('/trainers'));
}
module.exports = {
  index: trainerIndex,
  show: trainersShow,
  delete: trainersDelete,
  new: trainersNew,
  create: trainersCreate,
  edit: trainersEdit,
  update: trainersUpdate
};
