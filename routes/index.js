var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/volumes', db.getVolumes);
//router.get('/api/volumes/:volumeNumber/chapters', db.getChapters);
router.get('/api/volumes/:volumeNumber/chapters/:chapterNumber', db.getChapter);
router.get('/api/volumes/:volumeNumber/chapters/:chapterNumber/pages/:pageNumber', db.getPage);
//router.get('/api/volumes/:volumeNumber/chapters/:chapterNumber', db.getPages);

module.exports = router;
