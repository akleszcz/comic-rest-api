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

exports.getChapterByNumber = function(req, res) {
  Chapter.findOne({number: req.params.number, volume_number: req.params.volumeNumber}, function(err, chapter) {
    if (err)
      res.send(err);
    res.json(chapter);
  });
};
