'use strict';

var mongoose = require('mongoose'),
  Volume = mongoose.model('Volume');

exports.getVolumes = function(req, res) {
  Volume.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
