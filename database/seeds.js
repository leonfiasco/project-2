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
      year: '1991',
      description: 'triple black',
      url: 'https://i.imgur.com/iPdFqUe.jpg'
    },{
      name: 'Nike Cortez Kendrick Lamar',
      year: '2017',
      description: 'white and red',
      url: 'https://i.imgur.com/3S3Q4pQ.jpg'
    },{
      name: 'Nike Air Max Sean Wotherspoon',
      year: '2018',
      description: 'Light yellow is contrasted by grey, pink and blue before a dark green coloured mudguard',
      url: 'https://i.imgur.com/evW29fV.png'
    }
  ])
  // if successful then console.log number of records created
  .then(trainer => console.log(`${trainer.length} Records created`))
//if not then print an error message.
  .catch(err => console.log(err))
  //Close the db connection
  .finally(()=> mongoose.connection.close());
