'use strict';
var config = require('../../config'),
  jwt = require('jsonwebtoken');

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.createUser = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, task) {
    if (err)
      res.send(err);
    res.json({ success: true });
  });
};

exports.getUsers = function(req, res) {
  User.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.loginUser = function(req, res) {
  User.findOne({
    login: req.body.login
  }, function(err, user) {

    if (err) {
      throw err;
    }

    if (!user) {
      res.json({ success: false, message: 'User not found.' });
    }
    else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          throw err;
        }
        if (isMatch !== true) {
          res.json(401, { success: false, message: 'Password incorrect.', is_match: isMatch });
        }
        else {
          const payload =  {
            login: user.login,
            admin: user.admin
          };
          var token = jwt.sign(payload, config.secret, {
            expiresIn : 60*60*24 // expires in 24 hours
          });

          res.json(200, {
            success: true,
            message: 'Logged in successfully',
            login: user.login,
            admin: user.admin,
            token: token
          });
        }
      });
    }
  });
};

exports.getUser = function(req, res) {
  User.findOne({ login: req.decoded.login }, function(err, user) {
    if (err) throw err;
    res.json({
      success: true,
      login: req.decoded.login,
      admin: req.decoded.admin
    });
  });
};
