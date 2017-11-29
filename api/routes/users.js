'use strict';
var auth = require('./auth');

module.exports = function(app) {
  var user = require('../controllers/User');

  app.route('/api/users')
    .post(user.createUser);

  app.route('/api/user')
    .get(auth.authenticate, user.getUser);

  app.route('/api/users/login')
    .post(user.loginUser);
};
