let promise = require('bluebird');

let options = {
  // Initialization Options
  promiseLib: promise
};

/*let pgp = require('pg-promise')(options);
var config = require('./config.json');
let connectionString = config.connectionString;
console.log(connectionString);
let db = pgp(connectionString);*/

var path = __dirname + '/public/json/';

// add query functions
function getVolumes(req, res, next) {
  /*db.any('select number, title from volumes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all volumes'
        });
    })
    .catch(function (err) {
      return next(err);
    });*/
	res.sendFile( path + "/" + "volumes.json" );
}

function getChapter(req, res, next) {
  /*console.log(req.params.volumeNumber);
  db.any(`select chapter_number as number, chapter_title as title from v_volumes_chapters where volume_number = ${req.params.volumeNumber}`)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all chapters'
        });
    })
    .catch(function (err) {
      return next(err);
    });*/
	res.sendFile( path + "/" + "chapter.json" );
}

function getPage(req, res, next) {
	res.sendFile( path + "/" + `page${req.params.pageNumber}.json` );
}

/*function getThumbnails(req, res, next) {
  console.log(req.params.volumeNumber);
  db.any(`select page_thumbnail_url from v_volumes_chapters_pages where volume_number = ${req.params.volumeNumber} and chapter_number = ${req.params.chapterNumber} order by page_order_number`)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all thumbnails'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}*/

/*function getPages(req, res, next) {
  db.any('select number, title from volumes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all volumes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}*/
//obrazki: http://localhost:3001/images/volume1/chapter1/fullsize/page1.png

module.exports = {
  getVolumes: getVolumes,
  getChapter: getChapter,
  getPage
};