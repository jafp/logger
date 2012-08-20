
/**
 * Module dependencies.
 */

var express = require('express')
  , io = require('socket.io')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/view');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('this_is_very_secret'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index');
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var logs = [ {description: 'First log', status: 'success', date: new Date().toString()} ];

var ios = io.sockets;
ios.on('connection', function(socket) {
  
  ios.emit('log:change', logs);

  socket.on('log:add', function(obj) {
    logs.push(obj);
    ios.emit('log:change', logs);
  });

});