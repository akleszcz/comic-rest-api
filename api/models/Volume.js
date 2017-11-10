'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VolumeSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  chapters: {
    type: []
  }
});

module.exports = mongoose.model('Volume', VolumeSchema);
