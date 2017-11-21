'use strict';

var mongoose = require('mongoose'),
Page = mongoose.model('Page'),
Chapter = mongoose.model('Chapter'),
async = require('async');

/*exports.getPageByNumber = function(req, res) {
  Page.find()
  .sort({order_number: 1})
  .skip (req.params.number - 1)
  .limit(1)
  .exec(function(err, page) {
    if (err)
      res.send(err);
    res.json(page[0].url);
  });
};*/

exports.getPageById = function(req, res) { //returns page url and number of pages in chapter

        /*Page.findOne({id: req.params.id})
        .exec().then(function(err, page) {
          var locals = { ble: "ble"};
          if (err) {
            res.send(err);
          }
          else {
            locals.url = page.url;
            locals.chapter_id = page.chapter_id;
          }
          return Chapter.findOne({id: locals.chapter_id}).exec()
          .then(function(chapter){
            locals.number_of_pages = chapter.thumbnails.length;
            //return locals;
          });
        })
        .then((locals) => {
            res.json({hej: "hej"})
          });
        /*.then((locals) =>
          res.json(locals)
        );*/

  Page.findOne({id: req.params.id}).exec()
    .then(function(page){
      let result = [];
      return Chapter.findOne({id: page.chapter_id}).exec()
        .then(function(chapter){
          return [page, chapter];
        });
    })
    .then(function(result){
      let page = result[0];
      let chapter = result[1];
      let {id, previous_page_id, next_page_id, url} = page;
      res.json({ id, previous_page_id, next_page_id, url, number_of_pages: chapter.thumbnails.length});
    })
    .then(undefined, function(err){
      //Handle error
    })
};
