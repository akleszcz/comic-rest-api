'use strict';

var mongoose = require('mongoose'),
  Volume = mongoose.model('Volume');

exports.getVolumes = function(req, res) {
  Volume.find({}, {"_id": 0, "chapters._id": 0, "__v": 0}).sort({order_number: 1}).exec(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.getVolumeById = function(req, res) {
  Volume.findOne({id: req.params.id},  {"_id": 0, "chapters._id": 0, "__v": 0}).exec(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.createVolume = function(req, res) {
  var newVolume = new Volume(req.body);
  newVolume.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.updateVolume = function(req, res) {
  Volume.findOneAndUpdate(
    {id: req.params.id},
    {$push: {"chapters": {
      $each: [ {title: req.body.title} ],
      $position: parseInt(req.body.position)
      }}},
      {"new": true})
    .exec()
    .then(volume=>{
        res.json({id: volume.chapters[req.body.position].id});
    })
  /*Volume.update(
        {id: req.params.id},
        {$push: {"chapters": {
          $each: [ {title: req.body.title} ],
          $position: parseInt(req.body.position)
        }}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            if (err)
              res.send(err);
            else
              res.json({model});
        }
    );*/
};
