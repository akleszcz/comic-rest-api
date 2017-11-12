var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Volume = require('./api/models/Volume'),
  Chapter = require('./api/models/Chapter'),
  Page = require('./api/models/Page'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:mongo@ds157185.mlab.com:57185/comic');//('mongodb://mongo:mongo.mlab.com:57185/comic');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//var routes = require('./api/routes/volumes');//require('./api/routes/volumes');
//routes(app);

var volumes = require('./api/routes/volumes');//require('./api/routes/volumes');
var chapters = require('./api/routes/chapters');
var pages = require('./api/routes/pages');
volumes(app);
chapters(app);
pages(app);

/*var volumes = require('./api/routes/volumes');
var chapters = require('./api/routes/chapters');

app.use('/volumes', volumes);
app.use('/chapters', chapters);*/


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
