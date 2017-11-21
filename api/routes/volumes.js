'use strict';
module.exports = function(app) {
  var volume = require('../controllers/Volume');

  app.route('/api/volumes')
    .get(volume.getVolumes)
    .post(volume.createVolume);

  app.route('/api/volumes/:id')
    .get(volume.getVolumeById)
    .put(volume.updateVolume);
};

/*var express = require('express');
var router = express.Router();
var volume = require('../controllers/Volume');

router.get('/api/volumes', volume.getVolumes);


module.exports = router;*/
