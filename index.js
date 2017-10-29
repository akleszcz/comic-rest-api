var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/volumes', db.getVolumes);


module.exports = router;