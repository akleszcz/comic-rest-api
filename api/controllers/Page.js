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

  /*Page.findOne({id: req.params.id}).exec()
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
    })*/
    Page.findOne({id: req.params.id}, {"_id": 0}, function(err, page) {
      if (err) {
        res.send(err);
      }
      else if (page) {
        res.json(page);
      }
      else {
        res.json("Page not found.");
      }
    });
};

exports.createPage = function(req, res) { /* params: url, thumbnail_url, chapter_id, previous_page_id */
  Chapter.findOne({id: req.body.chapter_id}, function(err, chapter) {
    if (err) {
      res.send(err);
    }
    else if (chapter) {
      const thumbnails = chapter.thumbnails;
      let nextPageId = null;
      if (req.body.previous_page_id) {
        const previousPageIndex = thumbnails.findIndex(p => p.id === req.body.previous_page_id);
        if (previousPageIndex === -1) {
          res.json("Previous page not found.");
        }
        if (previousPageIndex + 1 < thumbnails.length) {
          nextPageId = thumbnails[previousPageIndex + 1].id;
        }
        thumbnails.splice(previousPageIndex + 1, 0, {
          url: req.body.thumbnail_url
        });
        chapter.save();
        res.locals.newPageId = chapter.thumbnails[previousPageIndex + 1].id;
      }
      else {
        if (thumbnails.length > 0) {
          nextPageId = thumbnails[0].id;
        }
        thumbnails.unshift({
         url: req.body.thumbnail_url
        });
        chapter.save();
        res.locals.newPageId = chapter.thumbnails[0].id;
      }
      res.locals.nextPageId = nextPageId;
      //res.json({ previous_page_id: req.body.previous_page_id ? req.body.previous_page_id : null });
    }
    else {
      res.json("Chapter not found.");
    }
  })
  .then(() => {
    const newPage = new Page({
      id: res.locals.newPageId,
      url: req.body.url,
      previous_page_id: req.body.previous_page_id ? req.body.previous_page_id : null,
      next_page_id: res.locals.nextPageId,
      chapter_id: req.body.chapter_id
    });
    newPage.save(function(err, page) {
      if (err) {
        res.send(err);
      }
      res.json({
        success: true,
        message: 'Page created successfully',
        page: page
      });
    })
  });
}
