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

describe("list posts without filters", () => {
  let posts;

  beforeEach(async () => {
    posts = await listPosts();
  });

  test("should return all posts", async () => {
    expect(posts.length).toEqual(testPosts.length);
  });

  test("and sorted by created date in descending order", () => {
    expect(posts[0].title).toEqual(testPosts[2].title);
  });
});

describe("list posts with filters", () => {
  test("returns posts filtered by author", async () => {
    const posts = await listPosts({ author: "Farooq Mahmud" });
    expect(posts.length).toEqual(1);
    expect(posts[0].author).toEqual(testPosts[1].author);
  });

  test("returns posts filtered by tag", async () => {
    const posts = await listPosts({ tags: ["mongoose", "mongodb"] });
    expect(posts.length).toEqual(1);
    expect(posts[0].tags).toEqual(testPosts[0].tags);
  });
});
