import { beforeEach, describe, expect, test } from "@jest/globals";

import { listPosts } from "../services/posts.js";
import { Post } from "../db/models/post.js";

const testPosts = [
  {
    title: "Hello Mongoose!",
    author: "Daniel Bugl",
    contents: "This post is stored in a MongoDB database using Mongoose.",
    tags: ["mongoose", "mongodb"],
  },
  {
    title: "Hello NodeJS!",
    author: "Farooq Mahmud",
    contents: "This post is stored in a MongoDB database using Mongoose.",
    tags: ["node"],
  },
  {
    title: "Hello .NET!",
    author: "John Doe",
    contents: "This post is stored in a MongoDB database using Mongoose.",
    tags: [".net", "c#"],
  },
];

const createdPosts = [];

beforeEach(async () => {
  await Post.deleteMany({});

  for (const post of testPosts) {
    const newPost = new Post(post);
    const createdPost = await newPost.save(newPost);
    createdPosts.push(createdPost);
  }
});

describe("listing post", () => {
  test("without any filters should return all posts", async () => {
    const posts = await listPosts();
    expect(posts.length).toEqual(testPosts.length);
  });
});
