import mongoose from "mongoose";
import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { updatePost } from "../services/posts.js";
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

describe("updating posts", () => {
  let updatedPost;

  test("updates the specified property", async () => {
    const user = getUserTemplate();
    user.username = "foo@bar.com";
    const newUser = await user.save();
    const updatedAuthor = newUser._id;

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
    const user = await User.findOne({});
    updatedPost = await updatePost(new mongoose.Types.ObjectId(), {
      author: user._id,
    });
    expect(updatedPost).toBeNull();
  });

  test("returns original object when no properties are specified", async () => {
    updatedPost = await updatePost(createdPost._id, {});
    expect(updatedPost).toEqual(expect.objectContaining(testPost));
  });
});
