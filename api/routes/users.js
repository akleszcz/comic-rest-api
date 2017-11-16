'use strict';
module.exports = function(app) {
  var user = require('../controllers/User');

  app.route('/api/users')
    .post(user.createUser);

  app.route('/api/users/login')
    .post(user.loginUser);
};
