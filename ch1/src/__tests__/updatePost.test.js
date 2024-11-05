import mongoose from "mongoose";
import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { updatePost } from "../services/posts.js";
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

describe("updating posts", () => {
  let updatedPost;

  test("updates the specified property", async () => {
    const updatedAuthor = faker.person.fullName();
    updatedPost = await updatePost(createdPost._id, {
      author: updatedAuthor,
    });
    expect(updatedPost.author).toEqual(updatedAuthor);
  });

  test("and does not update other properties", () => {
    expect(updatedPost.title).toEqual(testPost.title);
    expect(updatedPost.contents).toEqual(testPost.contents);
    expect(updatedPost.tags).toEqual(testPost.tags);
  });

  test("returns null if post does not exist", async () => {
    updatedPost = await updatePost(new mongoose.Types.ObjectId(), {
      author: "foo",
    });
    expect(updatedPost).toBeNull();
  });

  test("returns original object when no properties are specified", async () => {
    updatedPost = await updatePost(createdPost._id, {});
    expect(updatedPost).toEqual(expect.objectContaining(testPost));
  });
});
