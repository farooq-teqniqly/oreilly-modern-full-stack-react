import { initDatabase } from "./db/init.js";
import { Post } from "./db/models/post.js";

await initDatabase();

const post = new Post({
  title: "Creating a full-stack app using MongoDB, Express, React, and Node.js",
  author: "Farooq Mahmud",
  contents: "This is a sample post.",
  tags: ["mongoose", "node.js", "javascript"],
});

await post.save();

const posts = await Post.find();
console.log(posts);
