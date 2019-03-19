var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


var text = "Some quick example text to build on the card title and make up the bulk of the card's content."


router.get('/', function(req, res){
    res.render('splash');
});

router.get('/home', function(req, res){
    var sections = [
        {title: "Heading 1", image: "imgs/teach.png", paragraph: text},
        {title: "Heading 2", image: "imgs/apples.png", paragraph: text},
        {title: "Heading 3", image: "imgs/glasses.png", paragraph: text}
    ]

    res.render('home', {articles: sections});
});

// AUTH ROUTES

// Register form
router.get('/register', function(req, res){
    res.render('register');
  });

// Registration
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
  //   eval(require('locus'))
    User.register(newUser, req.body.password, function(err, user){
        if(err){
          req.flash("error", err.message);
          return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to YelpCamp " + user.username);
          res.redirect("/pages");
        });
    });
  });
  
  // Login form
  router.get('/login', function(req, res){
    res.render('login');
  });
  
  // Login
  router.post('/login', passport.authenticate("local",
   {
     successRedirect: "/pages",
     failureRedirect: "/login"
   }), function(req, res){
  });
  
  
  // Logout Route
  router.get('/logout', middleware.isLoggedIn, function (req, res){
    req.logout();
    req.flash("success", "Logged you out!!");
    res.redirect('/pages');
  });


module.exports = router;