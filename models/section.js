var mongoose = require("mongoose");

var sectionSchema = new mongoose.Schema({
    text: String,
    image: String,
    description: String,
    author: {
      id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    }
});

module.exports = mongoose.model("Section", sectionSchema);