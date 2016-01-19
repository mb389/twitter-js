var express=require("express");
var morgan=require("morgan");
var fs=require('fs');

var app=express();

// var specialRouter=express.Router();
//
// app.use("/special",specialRouter);

app.listen(1337,function(){
console.log("listening on 1337");
});

app.use("/special",function(req, res,next) {
   console.log("This is special");
   next();
})

app.get("/text", function(req, res) {
   res.send("is here");
});

app.get("/", function(req, res) {
   res.send("you reached the special area");
});



// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

// app.get('/', function (req, res) {
//   res.send('hello, world!')
// })
