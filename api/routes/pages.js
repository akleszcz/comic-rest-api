'use strict';
module.exports = function(app) {
  var page = require('../controllers/Page');

  app.route('/api/pages')
    .post(page.createPage)

  app.route('/api/pages/:id')
    .get(page.getPageById);
};
