var express = require("express");
var router = express.Router({mergeParams: true});
var Page = require("../models/page");
var Section = require("../models/section");
var middleware = require("../middleware");


router.get("/new", middleware.isLoggedIn, function(req, res){
  Page.findById(req.params.id, function(err, page){
    if (err) {
      console.log(err);
    } else {
      res.render("sections/new", {page: page, username: req.user.username});
    }
  });
});


router.post("/", middleware.isLoggedIn, function(req, res){
    var text = req.body.text;
    var author = req.body.author;
    var newSection = {text: text, author: author}
    Page.findById(req.params.id, function(err, page){
        if(err){
            console.log(err);
            res.redirect("/pages");
        } else {
            Section.create(newSection, function(err, section){
                if(err){
                  req.flash("error", "Something went wrong. ");
                  console.log(err);
                } else {
                    //add username and id to section
                    section.author.id = req.user._id;
                    section.author.username = req.user.username;
                    //save section
                    section.save();
                    page.sections.push(section);
                    page.save();
                    req.flash("success", "Section added successfully.");
                    res.redirect('/pages/' + page._id);
                }
             });
        }
    });
});

// Sections Edit Route
router.get("/:section_id/edit", middleware.isLoggedIn, function(req, res){
  Section.findById(req.params.section_id, function(err, foundSection){
    if (err) {
      res.redirect("back");
    } else {
      res.render("sections/edit", {page_id: req.params.id, section: foundSection});
    }
  });
});

// Sections Update Route
router.put("/:section_id", middleware.isLoggedIn, function(req,res){
  Section.findByIdAndUpdate(req.params.section_id, req.body.section, function(err, updatedSection){
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/pages/" + req.params.id);
    }
  })
});

// Sections Destroy Route
router.delete("/:section_id", middleware.isLoggedIn, function(req, res){
  Section.findByIdAndRemove(req.params.section_id, function(err){
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Section deleted.");
      res.redirect("/pages/" + req.params.id);
    }
  })
});

module.exports = router;
