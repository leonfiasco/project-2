//creating an express router at top of file
const router = require('express').Router();
// const fantasy = require('../data/fantasy');
// const action = require('../data/action');

//adding routes
router.get('/', (req, res) => res.render('pages/home'));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/register', (req, res) => res.render('pages/register'));
router.get('/login', (req, res) => res.render('pages/login'));

// router.get('/fantasy', (req, res) => res.render('pages/category', { data: fantasy }));
// router.get('/action', (req, res) => res.render('pages/category', { data: action }));




module.exports = router;
