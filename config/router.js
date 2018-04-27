//creating an express router at top of file
const router = require('express').Router();
const registrations = require('../controllers/registration');
const sessions = require('../controllers/sessions');
const trainers = require('../controllers/trainers');

function secureRoute(req, res, next) {
  //if the user is not logged in
  if(!req.session.userId) {
    //clears the session cookie and redirect them to the login pages
    req.flash('danger', 'you must be logged in.');
    return req.session.regenerate(() => res.redirect('/login'));
  }

  next();
}




//adding routes
router.get('/', (req, res) => res.render('pages/home'));
router.get('/about', (req, res) => res.render('pages/about'));


router.route('/trainers')
  .get(trainers.index)
  .post(trainers.create);

router.route('/trainers/new')
  .get(trainers.new);

router.route('/trainers/:id')
  .get(trainers.show)
  .put(trainers.update)
  .delete(trainers.delete);

router.route('/trainers/:id/edit')
  .get(trainers.edit);

router.get('/logout', sessions.delete);


//authentication
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);


router.route('/logout')
  .get(secureRoute, sessions.delete);

//authentication ends
router.route('/*').get((req, res) => {
  req.flash('danger', 'THE URL REQUESTED DOESN\'T EXIST');
  res.redirect('/'); //This renders the error on the homepage
});

module.exports = router;
