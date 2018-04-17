const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { db } = require('../config/env');
mongoose.connect(db);

const Trainer = require('../models/trainer');

Trainer.collection.drop();

Trainer
  .create([
    {
      name: 'Nike Air huarache',
      description: 'triple black',
      photo: 'http://www.freerun3volt.com/nike-air-huarache-black-safari-triple-blackout-on-feet-p-902.html'
    },{
      name: 'Nike Cortez Kendrick Lamar',
      description: 'white and red',
      photo: 'https://www.highsnobiety.com/p/kendrick-lamar-nike-cortez-kenny-1-release/'
    },{
      name: 'Nike Air Max Sean Wotherspoon',
      description: 'Light yellow is contrasted by grey, pink and blue before a dark green coloured mudguard',
      photo: 'https://www.kicksonfire.com/nike-air-max-197-sean-wotherspoon-detailed-imagery/'
    }
  ])
  .then(trainer => console.log(`${trainer.length} Records created`)) // if successful then console.log records created
  .catch(err => console.log(err)) //if not then print an error message.
  .finally(()=> mongoose.connection.close()); //Close the db connection
