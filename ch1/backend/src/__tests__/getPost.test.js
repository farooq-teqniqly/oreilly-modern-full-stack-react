import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import mongoose from "mongoose";

import { getPost } from "../services/posts.js";
import { Post } from "../db/models/post.js";
import { faker } from "@faker-js/faker";

const testPost = {
  title: faker.lorem.sentence(),
  author: faker.person.fullName(),
  contents: faker.lorem.paragraph(),
  tags: ["mongoose", "mongodb"],
};

let createdPost;

beforeEach(async () => {
  await Post.deleteMany({});
  const newPost = new Post(testPost);
  createdPost = await newPost.save(newPost);
});

afterEach(async () => {
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
