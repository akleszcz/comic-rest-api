'use strict';

var mongoose = require('mongoose'),
Chapter = mongoose.model('Chapter');

exports.getChapters = function(req, res) {
  Chapter.find({}, {"_id": 0}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.getChapterById = function(req, res) {
  Chapter.findOne({id: req.params.id}, {"_id": 0}, function(err, chapter) {
    if (err) {
      res.send(err);
    }
    else if (chapter) {
      res.json(chapter);
    }
    else {
      res.json({});
    }
  });
};

exports.createChapter = function(req, res) {
  const newChapter = new Chapter();
  newChapter.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
