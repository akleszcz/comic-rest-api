var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  Volume = require('./api/models/Volume'),
  Chapter = require('./api/models/Chapter'),
  Page = require('./api/models/Page'),
  User   = require('./api/models/User');
  bodyParser = require('body-parser'),
  config = require('./config');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);//('mongodb://mongo:mongo.mlab.com:57185/comic');
app.set('superSecret', config.secret);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, token');

    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
});



//var routes = require('./api/routes/volumes');//require('./api/routes/volumes');
//routes(app);

var volumes = require('./api/routes/volumes');
var chapters = require('./api/routes/chapters');
var pages = require('./api/routes/pages');
var users = require('./api/routes/users');
volumes(app);
chapters(app);
pages(app);
users(app);

/*var volumes = require('./api/routes/volumes');
var chapters = require('./api/routes/chapters');

app.use('/volumes', volumes);
app.use('/chapters', chapters);*/


app.listen(port);


console.log('comic RESTful API server started on: ' + port);
