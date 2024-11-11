import mongoose from "mongoose";
import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { deletePost, getPost } from "../services/posts.js";
import { Post } from "../db/models/post.js";
import { User } from "../db/models/user.js";

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

describe("deleting posts", () => {
  test("deletes the post", async () => {
    await deletePost(createdPost._id);
    const post = await getPost(createdPost._id);
    expect(post).toBeNull();
  });

  test("when post doesn't exist should succeed", async () => {
    const id = new mongoose.Types.ObjectId();
    await deletePost(id);
    const post = await getPost(id);
    expect(post).toBeNull();
  });
});
