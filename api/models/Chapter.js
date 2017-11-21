'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');


var ChapterSchema = new Schema({
  id: {
    type: String,
    'default': shortid.generate
  },
  thumbnails: [{
    id: {
      type: String,
      'default': shortid.generate
    },
    url: String
     }]
});

module.exports = mongoose.model('Chapter', ChapterSchema);
