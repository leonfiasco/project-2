const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { db } = require('../config/env');
mongoose.connect(db);

const Trainer = require('../models/trainer');
const User = require('../models/user');

Trainer.collection.drop();

User.collection.drop();

User.create([
  {
    username: 'le',
    email: 'le@g.co',
    password: '1',
    passwordConfirmation: '1'

  },{
    username: 'dar',
    email: 'dar@g.co',
    password: '1',
    passwordConfirmation: '1'
  },{
    username: 'eug',
    email: 'eug@g.co',
    password: '1',
    passwordConfirmation: '1'
  }
])
  .then(users => {
    console.log(`${users.length} user were created`);

    return Trainer
      .create([
        {
          name: 'Nike Air Huarache',
          year: '1991',
          description: 'Triple black Huarache designed to stretch with your foot, the shoe has remained a sneaker staple since its 1991 debut, when it changed the face of running footwear forever.',
          url: 'https://i.imgur.com/iPdFqUe.jpg',
          user: users[0]._id,

          reviews: [
            {
              rating: 2,
              content: 'dope shoes',
              user: users[0]._id
            },{
              rating: 5,
              content: 'love them',
              user: users[2]._id
            }
          ]
        },{
          name: 'Nike Cortez Kendrick Lamar',
          year: '2017',
          description: 'The Cortez boasts a white leather upper, complemented by red stitching and matching DAMN. and Swoosh branding. A black tongue provides added contrast.',
          url: 'https://i.imgur.com/3S3Q4pQ.jpg',
          user: users[0]._id,
          reviews: [
            {
              rating: 3,
              content: 'they\'re my favs',
              user: users[0]._id
            },{
              rating: 4,
              content: 'love anything with kendrick',
              user: users[2]._id
            }
          ]
        },{
          name: 'Nike Air Max Sean Wotherspoon',
          year: '2018',
          description: 'Light yellow is contrasted by grey, pink and blue before a dark green coloured mudguard',
          url: 'https://i.imgur.com/evW29fV.png',
          user: users[1]._id,
          reviews: [
            {
              rating: 4,
              content: 'they\'re my favs',
              user: users[0]._id
            },{
              rating: 4,
              content: 'love them',
              user: users[2]._id
            }
          ]
        },{
          name: 'Nike Presto Off-White',
          year: '2018',
          description: 'Nike presto boasts a dark colourway across the upper and is accented by a translucent white lace cage and a set of white laces. a stitched Swoosh features and a cable tie gives that classic street aesthetic.',
          url: 'https://imgur.com/ycslleN.jpg',
          user: users[1]._id,
          reviews: [
            {
              rating: 5,
              content: 'virgil is a boss',
              user: users[1]._id
            },{
              rating: 4,
              content: 'love them',
              user: users[2]._id
            }
          ]
        },{
          name: 'UNDFTD x Nike Air Max 97',
          year: '2017',
          description: 'The Nike Air Max 97 x Undefeated collaboration that features a black, gorge green, white and speed red tones throughout. The Gucci-esque colors pay tribute to Italy, and features repeated undefeated branding from front to back.',
          url: 'https://imgur.com/grqeXyo.jpg',
          user: users[1]._id,
          reviews: [
            {
              rating: 4,
              content: 'they\'re my favs',
              user: users[0]._id
            },{
              rating: 4,
              content: 'love them',
              user: users[2]._id
            }
          ]
        },{
          name: 'Off-White x Air Jordan 1',
          year: '2018',
          description: 'The iconic silhouette boasts a classic “Chicago” colorway that gets remixed with deconstructed details, text graphic overlays, an oversized Swoosh, blue and orange stitching, OFF-WHITE branding throughout. ',
          url: 'https://imgur.com/R3UhQ3l.jpg',
          user: users[2]._id,
          reviews: [
            {
              rating: 4,
              content: 'they\'re my favs',
              user: users[0]._id
            },{
              rating: 4,
              content: 'love them',
              user: users[2]._id
            }
          ]
        }
      ]);
  })
  // if successful then console.log number of records created
  .then(trainer => console.log(`${trainer.length} Records created`))
//if not then print an error message.
  .catch(err => console.log(err))
  //Close the db connection
  .finally(()=> mongoose.connection.close());
