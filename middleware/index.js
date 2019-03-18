var Page = require("../models/page");
var Section = require("../models/section");

var middlewareObj = {};


middlewareObj.checkPageOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Page.findById(req.params.id, function(err, foundPage){
        if (err) {
            req.flash("error", "Page was not found.");
            res.redirect("back");
        } else {
            if(foundPage.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "Please ask Page owner to do this.");
                res.redirect("back");
            }
        }
        });
    } else {
        req.flash("error", "Please login first.");
        res.redirect("back");
    }
}

middlewareObj.checkSectionOwnership = function checkSectionOwnership(req, res, next){
    if(req.isAuthenticated()){
        Section.findById(req.params.section_id, function(err, foundSection){
        if (err) {
            res.redirect("back");
        } else {
            if(foundSection.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "Only the section owner can do that.");
                res.redirect("back");
            }
        }
        });
    } else {
        req.flash("error", "Please login first.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first!!");
    res.redirect("/login");
}

module.exports = middlewareObj