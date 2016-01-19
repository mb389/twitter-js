var express=require("express");
var morgan=require("morgan");
var fs=require("fs");
var swig=require("swig");
var tweetBank=require("./tweetBank");
var bodyParser=require("body-parser");
var urlEncodedParsing=bodyParser.urlencoded({ extended: false });
var jsonParsing=bodyParser.json();

var socketio = require('socket.io');
// ...

swig.setDefaults({cache:false});
var app=express();
var routes = require('./routes/');
app.use( '/', routes(io) );

app.use(express.static('public'));

app.listen(1337,function(){console.log("hi");});
var server = app.listen(1338);
var io = socketio.listen(server);


app.engine("html",swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.text({ type: 'text/html' }));

var userRouter = express.Router();
app.use('/users', userRouter);

userRouter.get('/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {"name": name} );
  res.render( 'index', { tweets: list, showForm:true, thisName: name } );
});

var mainRouter=express.Router();
app.use('/', mainRouter);

mainRouter.post("/tweets",urlEncodedParsing,function(req,res) {
   var name = req.body.name;
   var text = req.body.text;
   tweetBank.add(name, text);
   io.sockets.emit('new_tweet', { "name": name, "text": text });
   res.redirect("/");
});
