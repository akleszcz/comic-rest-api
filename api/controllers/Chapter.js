'use strict';

var mongoose = require('mongoose'),
Chapter = mongoose.model('Chapter'),
Volume = mongoose.model('Volume');

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
  //let chapterId;
  newChapter.save(function(err, chapter) {
    if (err)
      res.send(err);
    //res.json(chapter);
    return chapter;

  })
  .then ((chapter) =>
    Volume.findOneAndUpdate({id: req.body.volume_id}, {
      $push: {
              chapters: {
              $each: [{
              id: chapter.id,
              title: req.body.title
            }], $position: parseInt(req.body.position)
          }
        }
      },
      function(err, volume) {
        if (err) {
          res.send(err);
        }
        res.json({
          success: true,
          message: 'Chapter created successfully',
          chapter: {
            id: chapter.id,
            title: req.body.title,
            position: req.body.position,
            volume_id: volume.id
          }
        });
      })
  );

  /*
  /*Volume.findOne({id: req.body.volume_id}, function(err, volume) {
    if (err) {
      res.send(err);
    }
    else if (volume) {
      volume.chapters.splice(req.body.index, 0, { id: res.locals.id, title: req.body.title });
      res.json({
        success: true,
        message: 'Chapter created successfully'
      });
    }
  });*/
};
