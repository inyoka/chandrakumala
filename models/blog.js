var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    image: String,
    body:   String,
    author: {id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, username: String },
    // comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean
});