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
          const thumbnails = chapter.thumbnails;
          const pageNumber = thumbnails.indexOf(thumbnails.find(p => p.id === page.id)) + 1;
          const firstPageId = thumbnails[0].id;
          const lastPageId = thumbnails[thumbnails.length-1].id;

          return {page, number_of_pages: chapter.thumbnails.length, number: pageNumber, first_page_id: firstPageId, last_page_id: lastPageId};
        });
    })
    .then(function({page, number_of_pages, number, first_page_id, last_page_id}){
      let {id, previous_page_id, next_page_id, url} = page;
      res.json({ id, previous_page_id, next_page_id, url, number_of_pages, number, first_page_id, last_page_id});
    })
    .then(undefined, function(err){
      //Handle error
    })
};
