var express = require("express");
var router = express.Router();

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

router.post('/home', function(req, res){
    
})

module.exports = router;