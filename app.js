const express = require("express");
const mongoose = require("mongoose");
const Post = require("./model/post");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

app.get("/postlist", async (req, res) => {
  await Post.find({}, (err, result) => {
    console.log("posts from db: ", result);
    res.send(result);
  });
});

app.post("/post", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      createdTime: new Date(),
      votes: 0,
    });

    await Post.create(newPost);
    res.send("Post added");
  } catch (err) {
    console.log("error: ", err);
  }
});

app.post("/upvote/:id", async (req, res) => {
  try {
    // find correct post though id in URL
    await Post.find({ _id: req.params.id }, (err, result) => {
      console.log(`Upvoted post with id: ${req.params.id}`);
      const post = result[0];
      post.votes += 1;
      console.log("POST: ", post);
      post.save();
      res.send(post);
    });
  } catch (err) {
    console.log("error: ", err);
  }
});

app.post("/downvote/:id", async (req, res) => {
  try {
    // find correct post though id in URL
    await Post.find({ _id: req.params.id }, (err, result) => {
      console.log(`Downvoted post with id: ${req.params.id}`);
      const post = result[0];
      post.votes -= 1;
      console.log("POST: ", post);
      post.save();
      res.send(post);
    });
  } catch (err) {
    console.log("error: ", err);
  }
});

app.delete("/post/delete/:id", async (req, res) => {
  try {
    // find correct post though id in URL
    await Post.deleteOne({ _id: req.params.id }, function (err, result) {
      const post = result[0];
      if (err) return handleError(err);
      console.log(`Delete post with id: ${req.params.id}`);
      res.send(post);
    });
  } catch (err) {
    console.log("error: ", err);
  }
});

app.listen(port, () => {
  console.log(`App is listening at http://locahost:${port}`);
});
