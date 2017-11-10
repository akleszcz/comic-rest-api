'use strict';

var mongoose = require('mongoose'),
Chapter = mongoose.model('Chapter');

exports.getChapters = function(req, res) {
  Chapter.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
