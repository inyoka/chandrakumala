var express = require("express");
var router = express.Router();
var Page = require("../models/page");
var middleware = require("../middleware");
var Section = require("../models/section");


// INDEX - Displays list of all pages.

// Images from https://www.photosforclass.com/search?text=camping
router.get('/', function(req, res){
    // Get all pages from server.
    Page.find({}, function(err, allPages){
      if (err) {
        console.log(err);
      } else {
        res.render('pages/index', {pages:allPages});
      }
    });
});

// CREATE - Add new page to DB.

router.post('/', middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newPage = {name: name, image: image, description: desc, price: price, author: author}
  //  Create new page and save to DB.
  Page.create(newPage, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect("/pages");
    }
  });
});

// NEW - Displays form for new page.
router.get('/new', middleware.isLoggedIn, function(req, res){
  res.render('pages/new');
});

// SHOW - Displays info about one page.
router.get("/:id", function(req, res){
  Page.findById(req.params.id).populate("sections").exec(function(err, foundPage){
    if (err) {
      console.log(err);
    } else {
      console.log(foundPage);
      res.render("pages/show", {page: foundPage});
    }
  });
});

// EDIT page route. (form)
router.get("/:id/edit", middleware.checkPageOwnership, function(req, res){
    Page.findById(req.params.id, function(err, foundPage){
      res.render("pages/edit", {page:foundPage});
    });
});

// UPDATE page route. (submit address)
router.put("/:id", middleware.checkPageOwnership, function(req, res){
  Page.findByIdAndUpdate(req.params.id, req.body.page, function(err, updatedPage){
     if(err){
         res.redirect("/pages");
     } else {
         res.redirect("/pages/" + req.params.id);
     }
  });
});

// DESTROY PAGE ROUTE 
router.delete("/:id", middleware.checkPageOwnership, function(req, res){
  Page.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/pages");
    } else {
      res.redirect("/pages");
    }
  });
});

module.exports = router;
