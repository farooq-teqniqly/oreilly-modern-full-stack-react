import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import mongoose from "mongoose";

import { getPost } from "../services/posts.js";
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

const testPost = {
  title: faker.lorem.sentence(),
  author: null,
  contents: faker.lorem.paragraph(),
  tags: ["mongoose", "mongodb"],
};

let createdPost;

beforeEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  const user = getUserTemplate();
  const createdUser = await user.save();
  testPost.author = createdUser._id;
  const newPost = new Post(testPost);
  createdPost = await newPost.save(newPost);
});

afterEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
});

describe("get post by id", () => {
  test("returns the expected post", async () => {
    const post = await getPost(createdPost._id);
    expect(post._id).toEqual(createdPost._id);
  });

  test("returns undefined when post does not exist", async () => {
    const post = await getPost(new mongoose.Types.ObjectId());
    expect(post).toBeNull();
  });
});
