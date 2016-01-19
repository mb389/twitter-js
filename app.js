var express=require("express");

var app=express();


app.listen(1337,function(){
console.log("listening on 1337");
});

app.get('/',function(req,res){
   res.send("Hello!");
});
