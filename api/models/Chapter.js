'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChapterSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  volume_number: {
    type: Number,
    required: true
  },
  thumbnails: {
    type: []
  }
});

module.exports = mongoose.model('Chapter', ChapterSchema);
