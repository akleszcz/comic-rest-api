'use strict'
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  login: String,
  password: String,
  admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
