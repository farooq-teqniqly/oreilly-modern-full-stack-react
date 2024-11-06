import mongoose from "mongoose";
import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { deletePost, getPost } from "../services/posts.js";
import { Post } from "../db/models/post.js";

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
