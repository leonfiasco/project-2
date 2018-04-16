// requiring express
const express = require('express');
// creating the app
const app = express();
//setting up the port
const PORT = process.env.PORT || 8000;
//tell express to use express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');
//requiring router
const router = require('./config/router');
//requiring mongoose


//configuring express to use ejs
app.set('view engine', 'ejs');
//looks for files in my views folder
app.set('views', `${__dirname}/views`);
//tell express to use express-ejs-layouts
app.use(expressLayouts);


//telling express to look the folder for static files
app.use(express.static(`${__dirname}/public`));

//adding request listener to serve home template
app.get('/', (req, res) => res.render('pages/home'));

//tell express to use Router
app.use(router);


app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
