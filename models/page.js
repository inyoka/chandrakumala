var mongoose = require("mongoose");

var pageSchema = new mongoose.Schema({
   name: String,
   price: String,
   author: {
     id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
     },
     username: String
   },
   section: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Section"
      }
   ]
});

module.exports = mongoose.model("Page", pageSchema);