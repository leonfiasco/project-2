//creating an express router at top of file
const router = require('express').Router();
const registrations = require('../controllers/registration');
const sessions = require('../controllers/sessions');


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

router.route('login')
  .get(sessions.new)
  .post(sessions.create);
module.exports = router;
