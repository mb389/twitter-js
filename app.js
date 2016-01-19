var express=require("express");
var morgan=require("morgan");
var fs=require("fs");
var swig=require("swig");
swig.setDefaults({cache:false});
var app=express();
var routes = require('./routes/');
app.use('/', routes);

app.use(express.static('public'));



app.listen(1337,function(){
console.log("listening on 1337");
});

var people =[{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

app.engine("html",swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', function (req, res) {
   res.render( 'index', {title: 'Hall of Fame', people: people} );

})
