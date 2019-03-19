var mongoose = require("mongoose");

var pageSchema = new mongoose.Schema({
   name: String,
   author: {
     id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
     },
     username: String
   },
   sections: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Section"
      }
   ]
});

module.exports = mongoose.model("Page", pageSchema);