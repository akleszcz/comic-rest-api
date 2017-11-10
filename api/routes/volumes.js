'use strict';
module.exports = function(app) {
  var volume = require('../controllers/Volume');

  app.route('/api/volumes')
    .get(volume.getVolumes)
};

/*var express = require('express');
var router = express.Router();
var volume = require('../controllers/Volume');

router.get('/api/volumes', volume.getVolumes);


module.exports = router;*/
