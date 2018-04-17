//creating an express router at top of file
const router = require('express').Router();
const registrations = require('../controllers/registration');
const sessions = require('../controllers/sessions');

function secureRoute(req, res, next) {
  //if the user is not logged in
  if(!req.session.userId) {
    //clears the session cookie and redirect them to the login pages
    req.flash('danger', 'you must be logged in.');
    return req.session.regenerate(() => res.redirect('/login'));
  }

  next();
}

// function flashRoute(req, res, next) {
//   if (!req.session.userId) {
//     return req.sesssion.regenerate(() =>{
//       req.flash('danger', 'you must be logged in.');
//       res.redirect('/login');
//     });
//   }
//
//   //reassigning the session id for good measure
//   req.session.userId = user._id;
//
//   res.locals.user = user;
//   res.locals.isLoggedIn = true;
//
//   return next();
//
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
  .get(secureRoute, sessions.delete);

//authentication ends

module.exports = router;
