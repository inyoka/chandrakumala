var express = require("express");
var app = express();

require('dotenv').config();

app.get("/", function(req, res){
    res.send("landing page");
});

var listener = app.listen(process.env.PORT, process.env.IP, function(){
    var address = listener.address().address;
    var port = listener.address().port;
  
    console.log('YelpCamp server listening on : ' + address + ':' + port);
  });