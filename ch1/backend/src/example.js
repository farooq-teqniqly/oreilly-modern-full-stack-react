import dotenv from "dotenv";
dotenv.config();

import { initDatabase } from "./db/init.js";
import { Post } from "./db/models/post.js";
import { User } from "./db/models/user.js";

await initDatabase();

await User.deleteMany({});
await Post.deleteMany({});

const user = new User({
  username: "fm123@foo.com",
  password: "1111111111",
});

const newUser = await user.save();

const post = new Post({
  title: "Creating a full-stack app using MongoDB, Express, React, and Node.js",
  author: newUser._id,
  contents: "This is a sample post.",
  tags: ["mongoose", "node.js", "javascript"],
});

const newPost = await post.save();

await Post.findByIdAndUpdate(newPost._id, {
  $set: {
    title:
      "Creating a full-stack app using MongoDB, Express, React, and Node.js (Part 2)",
  },
});

const posts = await Post.find();
console.log(posts);
