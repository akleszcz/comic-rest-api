'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');


var VolumeSchema = new Schema({
  id: {
    type: String,
    'default': shortid.generate
  },
  title: {
    type: String
  },
  order_number: {
    type: Number
  },
  chapters: [{
    id: {
      type: String,
      'default': shortid.generate
    },
    title: String
     }]
});

module.exports = mongoose.model('Volume', VolumeSchema);
