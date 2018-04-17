const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/env');
mongoose.connect(databaseURI);

const trainer = require('../models/trainer');

trainer.collection.drop();

trainer.create([{
  url: 'http://www.freerun3volt.com/nike-air-huarache-black-safari-triple-blackout-on-feet-p-902.html',
  comments: [
    'Nike Air huarache',
    'triple black'
  ]
}]);
