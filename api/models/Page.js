'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PageSchema = new Schema({
  order_number: {
    type: Number,
    required: true
  },
  chapter_number: {
    type: Number,
    required: true
  },
  volume_number: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Page', PageSchema);
