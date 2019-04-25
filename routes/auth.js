var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


// AUTH ROUTES

// Register form
router.get('/register', function(req, res){
    res.render('auth/register');
  });

// Registration
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
          req.flash("error", err.message);
          return res.redirect("/auth/register");
        }
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to Chandra Kumala School " + user.username);
          res.redirect("/slides");
        });
    });
  });
  
  // Login form
  router.get('/login', function(req, res){
    res.render('auth/login');
  });
  
  // Login
  router.post('/login', passport.authenticate("local",
   {
     successRedirect: "/slides",
     failureRedirect: "/auth/login",
     failureFlash: "username or password incorrect!"
   }), function(req, res){
  });
  
  // Logout Route
  router.get('/logout', middleware.isLoggedIn, function (req, res){
    req.logout();
    req.flash("success", "Logged you out!!");
    res.redirect('/slides');
  });

  module.exports = router;