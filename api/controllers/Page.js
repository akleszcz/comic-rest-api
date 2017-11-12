'use strict';

var mongoose = require('mongoose'),
Page = mongoose.model('Page'),
Chapter = mongoose.model('Chapter'),
async = require('async');

/*exports.getPageByNumber = function(req, res) {
  Page.find()
  .sort({order_number: 1})
  .skip (req.params.number - 1)
  .limit(1)
  .exec(function(err, page) {
    if (err)
      res.send(err);
    res.json(page[0].url);
  });
};*/

exports.getPageByNumber = function(req, res) { //returns page url and number of pages in chapter
  var locals = {};
        var tasks = [
            function(callback) {
              Page.find({chapter_number: req.params.chapterNumber, volume_number: req.params.volumeNumber})
              .sort({order_number: 1})
              .skip (req.params.number - 1)
              .limit(1)
              .exec(function(err, page) {
                if (err)
                  return callback(err);
                locals.url = page[0].url;
                callback();
              });
            },
            function(callback) {
                Chapter.findOne({number: req.params.chapterNumber, volume_number: req.params.volumeNumber}, { thumbnails: 1, _id: 0 }, function(err, chapter) {
                  if (err)
                    return callback(err);
                  locals.numberOfPages = chapter.thumbnails.length;
                  callback();
                });
            }
        ];

        async.parallel(tasks, function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) res.send(err); //If an error occurred, let express handle it by calling the `next` function
            // Here `locals` will be an object with `users` and `colors` keys
            // Example: `locals = {users: [...], colors: [...]}`
            res.json(locals);
        });
};
