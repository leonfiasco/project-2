//creating an express router at top of file
const router = require('express').Router();
const registrations = require('../controllers/registration');
const sessions = require('../controllers/sessions');

// function secureRoute(req, res, next) {
//   //if the user is not logged in
//   if(!req.session.userId) {
//     //clears the session cookie and redirect them to the login pages
//     return req.session.regenerate(() => res.redirect('/login'));
//   }
//
//   next();
// }


//adding routes
router.get('/', (req, res) => res.render('pages/home'));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/register', (req, res) => res.render('pages/register'));
router.get('/login', (req, res) => res.render('pages/login'));

router.get('/logout', sessions.delete);


//authentication
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


module.exports = router;
