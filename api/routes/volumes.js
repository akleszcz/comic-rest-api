'use strict';
module.exports = function(app) {
  var volume = require('../controllers/Volume');

  app.route('/volumes')
    .get(volume.getVolumes)
};
