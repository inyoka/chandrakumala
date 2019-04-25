var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

router.get('/', function(req, res){
    var sections = [
        {title: "Heading 1", image: "/imgs/teach.png", paragraph: 'sample'},
        {title: "Heading 2", image: "/imgs/apples.png", paragraph: 'sample'},
        {title: "Heading 3", image: "/imgs/glasses.png", paragraph: 'sample'}
    ]

    res.render('blog/index', {articles: sections});
});

module.exports = router;