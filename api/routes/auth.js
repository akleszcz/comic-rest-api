'use strict';
var config = require('../../config'),
  jwt = require('jsonwebtoken');

module.exports.authenticate = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Invalid token.' });
      } else {
        req.decoded = decoded;
        //res.json(req.decoded);
        next();
      }
    });

  } else {
    return res.status(403).send({
        success: false,
        message: 'Token missing.'
    });
  }
};

module.exports.authorize = function(req, res, next) {
  if (req.decoded.admin) {
    next();
  } else {
    return res.status(403).send({
        success: false,
        message: 'No administrator permission.'
    });
    //res.json(req.decoded);
  }
};
