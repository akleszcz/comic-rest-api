'use strict';
module.exports = function(app) {
  var chapter = require('../controllers/Chapter');

  app.route('/api/chapters')
    .get(chapter.getChapters);

  app.route('/api/volumes/:volumeNumber/chapters/:number')
    .get(chapter.getChapterByNumber)
};

/*var express = require('express');
var router = express.Router();
var chapter = require('../controllers/Chapter');

router.get('/api/chapters', chapter.getChapters);


module.exports = router;*/
