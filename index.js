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
//requiring express-flash
const flash = require('express-flash');
// requiring body-parser which take info from use and takes it to the server
const bodyParser = require('body-parser');

const User = require('./models/user');

const { port, database } = require('./config/env');

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect(database);

// setting up middleware
//setting up express-session

//configuring express to use ejs
app.set('view engine', 'ejs');
//looks for files in my views folder
app.set('views', `${__dirname}/views`);
//tell express to use express-ejs-layouts
app.use(expressLayouts);

//telling express to look the folder for static files
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'my super secret token', //Sign the session ID cookie. The content of the cookie will be encrypted using this, so if you open the cookie in Chrome dev tools the contents will be gibberish.
  resave: false, // Not sure what this really does.
  saveUninitialized: false // Prevents saving sessions that are not modified. (Not sure what this really means, but magic I guess.)
}));

app.use(flash());

app.use((req, res, next) =>{
  //if there is no user ID, then there is nothing to do, move on to the routes
  if(!req.session.userId) return next();

  //otherwise use the ID to find the user in the database
  User
    .findById(req.session.userId)
    .then((user) =>{
      req.session.userId = user._id; // This has been set in sessions.create in the sessions model order to store the userId on the client's machine. Here we set req.session.userId to be the same as the ID of the user's document in the database, then change the currentUser to User and set isLoggedIn to true.
      res.locals.user = user;
      req.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });
// res contains locals, locals contains user because we put it there.
});



//tell express to use Router
app.use(router);


app.listen(port, () => console.log(`Up and running on port ${port}`));
