// requiring express
const express = require('express');
// creating the app
const app = express();
//tell express to use express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');
//requiring router
const router = require('./config/router');
//requiring express-sessions
const session = require('express-session');

const flash = require('express-flash');

const bodyParser = require('body-parser');

const User = require('./models/user');

const { port, db } = require('./config/env');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(db);

// setting up middleware
//setting up express-session
app.use(session({
  // a random key used to encrypt the session cookie
  secret: 'GysHa^72u91sk0P(',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) =>{
  //if there is no user Id,then thers nothing to do, move to routes
  if(!req.session.userId) return next();

  //otherwise use id to find user in database
  User
    .findById(req.session.userId)
    .then(user => {

    //if user haasn't been found || if they deleted their account
    //log them out (delete the data in the session)
      if(!user) req.session.regenerate(() => res.redirect('/login'));


      //it gives a boolean value to say whether the user is logged in or nnot
      res.locals.isAuthenticated = true;
      res.locals.currentUser = user;

      //store the user data on 'req' to be used inside the controllers
      req.currentUser = user;


      next();

    });
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

//configuring express to use ejs
app.set('view engine', 'ejs');
//looks for files in my views folder
app.set('views', `${__dirname}/views`);
//tell express to use express-ejs-layouts
app.use(expressLayouts);


//telling express to look the folder for static files
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

//adding request listener to serve home template
app.get('/', (req, res) => res.render('pages/home'));

//tell express to use Router
app.use(router);


app.listen(port, () => console.log(`Up and running on port ${port}`));
