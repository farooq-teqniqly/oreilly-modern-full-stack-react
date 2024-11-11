import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";

import { listPosts } from "../services/posts.js";
import { Post } from "../db/models/post.js";
import { User } from "../db/models/user.js";
import { faker } from "@faker-js/faker";

const getUserTemplate = () => {
  const user = new User({
    username: faker.internet.email(),
    password: faker.internet.password(),
  });

  return user;
};

const testPosts = [
  {
    title: "Post1",
    author: null,
    contents: faker.lorem.paragraph(),
    tags: ["mongoose", "mongodb"],
  },
  {
    title: "Post2",
    author: null,
    contents: faker.lorem.paragraph(),
    tags: ["node"],
  },
  {
    title: "Post3",
    author: null,
    contents: faker.lorem.paragraph(),
    tags: [".net", "c#"],
  },
];

const createdPosts = [];

beforeEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});

  const user = getUserTemplate();
  const createdUser = await user.save();

  for (const post of testPosts) {
    const newPost = new Post(post);
    newPost.author = createdUser._id;
    const createdPost = await newPost.save(newPost);
    createdPosts.push(createdPost);
  }
});

afterEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
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
    const user = await User.findOne({});
    const posts = await listPosts({ author: user._id });
    expect(posts.length).toEqual(3);
  });

  test("returns posts filtered by tag", async () => {
    const posts = await listPosts({ tags: ["mongoose", "mongodb"] });
    expect(posts.length).toEqual(1);
    expect(posts[0].tags).toEqual(testPosts[0].tags);
  });
});

describe("sorting tests", () => {
  test("can sort by author", async () => {
    const user = await User.findOne({});

    let posts = await listPosts(
      {},
      { sortBy: "author", sortOrder: "ascending" },
    );
    expect(posts[0].author).toEqual(user._id);

    posts = await listPosts({}, { sortBy: "author", sortOrder: "descending" });
    expect(posts[0].author).toEqual(user._id);
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
