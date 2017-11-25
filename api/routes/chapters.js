'use strict';
var auth = require('./auth');

module.exports = function(app) {

  var chapter = require('../controllers/Chapter');

  app.route('/api/chapters')
    .get(chapter.getChapters)
    .post(auth.authenticate, auth.authorize, chapter.createChapter);

  app.route('/api/chapters/:id')
    .get(chapter.getChapterById)
};

/*var express = require('express');
var router = express.Router();
var chapter = require('../controllers/Chapter');

router.get('/api/chapters', chapter.getChapters);


module.exports = router;*/
