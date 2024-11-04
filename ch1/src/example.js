import { initDatabase } from "./db/init.js";
import { Post } from "./db/models/post.js";

await initDatabase();

const post = new Post({
  title: "Creating a full-stack app using MongoDB, Express, React, and Node.js",
  author: "Farooq Mahmud",
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
