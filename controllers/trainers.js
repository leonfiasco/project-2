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
    //populating the user data for each comment
    .populate('comments.user')
    .exec()
    .then(trainer => {
      res.render('trainers/show', { trainer });
    });
}

function commentsCreate(req, res){
// fiding the trainer that the comment must be added to
  Trainer
    .findById(req.params.id)
    .exec()
    .then(trainer => {
      // adding the current user to the comment form data
      req.body.user = req.currentUser;

      //creating a new comment with the form data
      const comment = new Comment(req.body);

      //pushing the comment iinto the array ofcomments for the photo
      trainer.comments.push(comment);

      //saving the photo
      return trainer.save();
    })
    .then(trainer => {
      //redirecting back to the photos show reviews
      res.res.redirect(`/trainers/${trainer._id}`);
    })
    .catch(err => console.log(err));
}



function commentsDelete(req, res) {
//fiinding the photo that the comment must be added to photo
  trainerIndex
    .findById(req.params.trainerId)
    .exec()
    .then(trainer => {
      // finding the comment to delete by it's id
      const comment = trainer.comment.id(req.params.commentId);
      // fing that comment
      comment.remove();

      // saving the photo
      return trainer.save();
    })
    .then(trainer => {
    // redirecting back to the trainers show views
      res.redirect(`/trainers/${trainer._id}`);
    })
    .catch(err => console.log(err));

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
  update: trainersUpdate,
  createComment: commentsCreate,
  deleteComment: commentsDelete

};
