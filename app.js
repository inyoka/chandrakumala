var express = require("express");
var app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Page = require("./models/page"),
    Section = require("./models/section"),
    User = require("./models/user");

require('dotenv').config();

let dateandtime = require('./library/date-and-time');
date = dateandtime.format(new Date(), 'dddd, DD MMMM YYYY');

//requiring routes
var sectionRoutes = require("./routes/sections"),
    pageRoutes = require("./routes/pages"),
    indexRoutes = require("./routes/index")

var databaseurl = process.env.DATABASEURL || 'mongodb://localhost/chandrakumala_01';
mongoose.connect(databaseurl, { useNewUrlParser: true });

// Stops deprecation warning about collection.findAndModify
mongoose.set('useFindAndModify', false);


require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());
app.set('view engine', 'ejs');

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
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/pages", pageRoutes);
app.use("/sections/:id/sections", sectionRoutes);

// Use Environmental variables to determine PORT and IP to liston on...

var listener = app.listen(process.env.PORT, process.env.IP, function(){
    var address = listener.address().address;
    var port = listener.address().port;
  
    console.log('ChandraKumala server listening on : ' + address + ':' + port);
    console.log('Database in use : ' + databaseurl);
    console.log('Date : ' + date);
  });