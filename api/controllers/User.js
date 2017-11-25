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

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'User not found.' });
    }
    else {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Password incorrect.' });
      }
      else {
        const payload =  {
          admin: user.admin
        };
        var token = jwt.sign(payload, config.secret, {
          expiresIn : 60*60*24 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Logged in successfully',
          token: token
        });
      }
    }
  });
};
