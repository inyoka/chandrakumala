var express = require("express");
var app = express(),
    time = new Date().toLocaleTimeString(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Slide = require("./models/slide"),
    User = require("./models/user");

let dateandtime = require('./library/date-and-time');
date = dateandtime.format(new Date(), 'dddd, DD MMMM YYYY');

require('dotenv').config();

// var databaseurl = process.env.DATABASEURL || 'mongodb://localhost/chandrakumala_01';
var databaseurl = 'mongodb://localhost/chandrakumala_01';
mongoose.connect(databaseurl, { useNewUrlParser: true });

// Stops deprecation warning about collection.findAndModify
mongoose.set('useFindAndModify', false);


require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());
app.set('view engine', 'ejs');

// var seedDB = require("./seeds");
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.date = date;
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//requiring routes
var authRoutes = require("./routes/auth"),
    blogRoutes = require("./routes/blog"),
    indexRoutes = require("./routes/index")
    
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

// Use Environmental variables to determine PORT and IP to liston on...

var listener = app.listen(process.env.PORT, process.env.IP, function(){
    var address = listener.address().address;
    var port = listener.address().port;
  
    console.log('ChandraKumala server listening on : ' + address + ':' + port);
    console.log('Database in use :  \n' + databaseurl);
    console.log('Time : ' + time);
    console.log('Date : ' + date);
  });