var express = require("express");
var app = express();
var indexRoutes = require("./routes/index");

require('dotenv').config();

app.set("view engine", "ejs");

app.use("/", indexRoutes);

// Use Environmental variables to determine PORT and IP to liston on...

var listener = app.listen(process.env.PORT, process.env.IP, function(){
    var address = listener.address().address;
    var port = listener.address().port;
  
    console.log('YelpCamp server listening on : ' + address + ':' + port);
  });