'use strict';
module.exports = function(app) {
  var page = require('../controllers/Page');

  app.route('/api/volumes/:volumeNumber/chapters/:chapterNumber/pages/:number')
    .get(page.getPageByNumber)
};
