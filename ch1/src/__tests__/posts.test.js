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

    let failed = true;

    try {
      await createPost(post);
      failed = false;
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("`title` is required");
    } finally {
      expect(failed).toBe(true);
    }
  });

  test("with invalid title values should fail", async () => {
    const invalidTitles = ["", "   "];

    const post = {
      author: "Daniel Bugl",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };

    for (const title of invalidTitles) {
      let failed = true;

      post.title = title;

      try {
        await createPost(post);
        failed = false;
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.message).toContain("`title` is required");
      } finally {
        expect(failed).toBe(true);
      }
    }
  });

  test("without author should fail", async () => {
    const post = {
      title: "Hello Mongoose!",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };

    let failed = true;

    try {
      await createPost(post);
      failed = false;
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("`author` is required");
    } finally {
      expect(failed).toBe(true);
    }
  });

  test("with invalid author values should fail", async () => {
    const invalidAuthors = ["", "  "];

    const post = {
      title: "Hello Mongoose!",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };

    for (const author of invalidAuthors) {
      post.author = author;

      try {
        await createPost(post);
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.message).toContain("`author` is required");
      }
    }
  });

  test("without content should fail", async () => {
    const post = {
      title: "Hello Mongoose!",
      author: "Daniel Bugl",
      tags: ["mongoose", "mongodb"],
    };

    let failed = true;

    try {
      await createPost(post);
      failed = false;
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("`contents` is required");
    } finally {
      expect(failed).toBe(true);
    }
  });

  test("with invalid content values should fail", async () => {
    const invalidContent = ["", "  "];

    const post = {
      title: "Hello Mongoose!",
      author: "Daniel Bugl",
      tags: ["mongoose", "mongodb"],
    };

    for (const content of invalidContent) {
      let failed = true;
      post.contents = content;

      try {
        await createPost(post);
        failed = false;
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.message).toContain("`contents` is required");
      } finally {
        expect(failed).toBe(true);
      }
    }
  });

  test("with invalid tag values should fail", async () => {
    const invalidTags = ["", "  "];

    const post = {
      title: "Hello Mongoose!",
      author: "Daniel Bugl",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: [],
    };

    for (const tag of invalidTags) {
      let failed = true;
      post.tags.push(tag);

      try {
        await createPost(post);
        failed = false;
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.message).toContain("`tags` is required");
      } finally {
        expect(failed).toBe(true);
      }
    }
  });
});
