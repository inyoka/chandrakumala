var express = require("express");
var router = express.Router();
var Slide = require("../models/slide");
var middleware = require("../middleware");

    
// INDEX - Displays list of all pages.
router.get('/', function(req, res){
    res.render('index');
});

// SLIDES INDEX - Displays list of all pages.
router.get('/slides', function(req, res){
    var first = "/imgs/coloring.png",
        second = "/imgs/teach.png",
        third = "/imgs/apples.png"

    Slide.find(function(err, slides){
        if (err) {
            console.log(err);
        } else {
            res.render('slides/index', {first, second, third});
        }
    });
});

// EDIT slide route. (form)
router.get("/slides/edit", middleware.isLoggedIn, function(req, res){
    Slide.find({}, function(err, slides){
        if(err){
            console.log(err);
        } else {
            res.render("slides/edit", {slides:slides});    
        }
    });
});

// UPDATE slide route. (submit address)
router.put("/", middleware.isLoggedIn, function(req, res){
    Slide.findOneAndUpdate({}, req.body.slide, function(err, slides){
        if(err){
            res.redirect("/slides");
        } else {
            res.redirect("/slides/", {slides:slides});
        }
    });
});

module.exports = router;