const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  createdTime: {
    type: Date,
    required: true,
    unique: true,
  },
  votes: {
    type: Number,
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
