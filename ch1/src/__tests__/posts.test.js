import mongoose from "mongoose";
import { describe, expect, test } from "@jest/globals";

import { createPost } from "../services/posts.js";
import { Post } from "../db/models/post.js";

describe("creating posts", () => {
  test("with all parameters should succeed", async () => {
    const post = {
      title: "Hello Mongoose!",
      author: "Daniel Bugl",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };

    const createdPost = await createPost(post);
    const foundPost = await Post.findById(createdPost._id);

    expect(foundPost).toEqual(expect.objectContaining(post));
    expect(foundPost.createdAt).toBeInstanceOf(Date);
    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });

  test("without tags should succeed", async () => {
    const post = {
      title: "Hello Mongoose!",
      author: "Daniel Bugl",
      contents: "This post is stored in a MongoDB database using Mongoose.",
    };

    const createdPost = await createPost(post);
    const foundPost = await Post.findById(createdPost._id);

    expect(foundPost).toEqual(expect.objectContaining(post));
    expect(foundPost.createdAt).toBeInstanceOf(Date);
    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });

  test("without title should fail", async () => {
    const post = {
      author: "Daniel Bugl",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };

    try {
      await createPost(post);
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("`title` is required");
    }
  });

  test("without author should fail", async () => {
    const post = {
      title: "Hello Mongoose!",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };

    try {
      await createPost(post);
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("`author` is required");
    }
  });

  test("without content should fail", async () => {
    const post = {
      title: "Hello Mongoose!",
      author: "Daniel Bugl",
      tags: ["mongoose", "mongodb"],
    };

    try {
      await createPost(post);
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("`content` is required");
    }
  });
});
