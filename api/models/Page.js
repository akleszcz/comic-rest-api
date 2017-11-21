'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');

var PageSchema = new Schema({
  id: {
    type: String,
    'default': shortid.generate
  },
  chapter_id: {
    type: String
  },
  previous_page_id: {
    type: String
  },
  next_page_id: {
    type: String
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Page', PageSchema);
