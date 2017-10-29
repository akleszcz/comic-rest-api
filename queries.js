let promise = require('bluebird');

let options = {
  // Initialization Options
  promiseLib: promise
};

let pgp = require('pg-promise')(options);
var config = require('./config.json');
let connectionString = config.connectionString;
console.log(connectionString);
let db = pgp(connectionString);

// add query functions
function getVolumes(req, res, next) {
  db.any('select * from volumes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all volumes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getVolumes: getVolumes
  /*getChapters: getChapters,
  getPages: getPages,
  getSingleage: getSinglepage*/
};