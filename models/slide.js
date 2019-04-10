var mongoose = require("mongoose");

var slidesSchema = new mongoose.Schema({
   title: String,
   paragraph: String,
   image: String,
});

module.exports = mongoose.model("Slides", slidesSchema);