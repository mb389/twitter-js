var express=require("express");
var app=express();
var morgan=require("morgan");
var fs=require("fs");
var swig=require("swig");
var tweetBank=require("./tweetBank");
var routes = require('./routes/');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var io = socketio.listen(server);
var server = app.listen(1337,  function(req, res, next){
  console.log("Server listening");
});

//app uses
app.use('/',routes(io));
app.use(express.static('public'));
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(function(req, res, next){
//     console.log(req.method + " " + req.url + " " + res.statusCode);
//     next();
// });

//view engine
swig.setDefaults({cache:false});
app.engine("html",swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// setup the logger
