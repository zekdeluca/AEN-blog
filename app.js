
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),

  // TypeError: Cannot read property 'domain' of undefined
  // at Domain.add (domain.js:171:27)
  // at errorHandler 
  // Thus, the below code was discontinued:

  // errorHandler = require('error-handler'),

  // And substituded with the following:
  errorHandler = require('errorhandler'),

  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

// Most middleware (like errorHandler) is no longer bundled with Express 
// and must be installed separately. Please see
// https://github.com/senchalabs/connect#middleware.
// Thus, the below code was discontinued:
// var app = module.exports = express();

// And substituded with the following:
var app = express();
//Middleware
//app.listen(3000)


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));

// body-parser deprecated
//		bodyParser: use individual json/urlencoded middlewares
// 		undefined extended: provide extended option
// Thus, the below code was discontinued:

//app.use(bodyParser());

// And substituded with the following:
// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  // Most middleware (like errorHandler) is no longer bundled with Express 
  // and must be installed separately. Please see
  // https://github.com/senchalabs/connect#middleware.
  // Thus, the below code was discontinued:
  
  // app.use(express.errorHandler());
  
  // And substituded with the following:
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
