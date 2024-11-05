import { beforeEach, describe, expect, test } from "@jest/globals";

import { listPosts } from "../services/posts.js";
import { Post } from "../db/models/post.js";
import { faker } from "@faker-js/faker";

const testPosts = [
  {
    title: "Post1",
    author: "Author1",
    contents: faker.lorem.paragraph(),
    tags: ["mongoose", "mongodb"],
  },
  {
    title: "Post2",
    author: "Author2",
    contents: faker.lorem.paragraph(),
    tags: ["node"],
  },
  {
    title: "Post3",
    author: "Author3",
    contents: faker.lorem.paragraph(),
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
    const posts = await listPosts({ author: testPosts[1].author });
    expect(posts.length).toEqual(1);
    expect(posts[0].author).toEqual(testPosts[1].author);
  });

  test("returns posts filtered by tag", async () => {
    const posts = await listPosts({ tags: ["mongoose", "mongodb"] });
    expect(posts.length).toEqual(1);
    expect(posts[0].tags).toEqual(testPosts[0].tags);
  });
});

describe("sorting tests", () => {
  test("can sort by author", async () => {
    let posts = await listPosts(
      {},
      { sortBy: "author", sortOrder: "ascending" },
    );
    expect(posts[0].author).toEqual(testPosts[0].author);

    posts = await listPosts({}, { sortBy: "author", sortOrder: "descending" });
    expect(posts[0].author).toEqual(testPosts[2].author);
  });

  test("can sort by title", async () => {
    let posts = await listPosts(
      {},
      { sortBy: "title", sortOrder: "ascending" },
    );
    expect(posts[0].title).toEqual(testPosts[0].title);

    posts = await listPosts({}, { sortBy: "title", sortOrder: "descending" });
    expect(posts[0].title).toEqual(testPosts[2].title);
  });
});
