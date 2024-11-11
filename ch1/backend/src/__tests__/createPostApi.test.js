import request from "supertest";
import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { Post } from "../db/models/post.js";
import { User } from "../db/models/user.js";
import { app } from "../app.js";

const getUserTemplate = () => {
  const user = new User({
    username: faker.internet.email(),
    password: faker.internet.password(),
  });

  return user;
};

let userId;

const getPostTemplate = () => {
  const post = {
    title: faker.lorem.sentence(),
    author: userId,
    contents: faker.lorem.paragraph(),
    tags: [faker.lorem.word()],
  };

  return post;
};

beforeEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  const user = getUserTemplate();
  const createdUser = await user.save();
  userId = createdUser._id;
});

afterEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
});

const postRequest = async (post, expectedStatus = 200) => {
  try {
    return await request(app)
      .post("/api/v1/posts")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(expectedStatus);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

describe("POST /api/v1/posts", () => {
  test("can create a new post", async () => {
    const post = getPostTemplate();
    const res = await postRequest(post);

    const createdPost = res.body;
    expect(createdPost._id).toHaveLength(24);
    expect(createdPost.author.toString()).toEqual(userId.toString());
    expect(createdPost.contents).toEqual(post.contents);
    expect(createdPost.tags).toEqual(post.tags);
    expect(new Date(createdPost.createdAt)).toEqual(expect.any(Date));
    expect(new Date(createdPost.updatedAt)).toEqual(expect.any(Date));
    expect(createdPost.__v).toEqual(0);
  });

  test("can create a new post without tags", async () => {
    const post = getPostTemplate();
    delete post["tags"];

    const res = await postRequest(post);

    const createdPost = res.body;
    expect(createdPost.tags).toHaveLength(0);
  });

  test("returns 400 for invalid post data", async () => {
    const post = {};

    const res = await postRequest(post, 400);

    const { error } = res.body;
    expect(error).toContain("`title` is required");
    expect(error).toContain("`author` is required");
    expect(error).toContain("`contents` is required");
  });

  test("returns 400 if author is missing", async () => {
    const post = getPostTemplate();
    delete post["author"];

    const res = await postRequest(post, 400);

    expect(res.body.error).toContain("`author` is required");
  });

  test("returns 400 if author is emoty or whitespace", async () => {
    const post = getPostTemplate();
    post.author = "  ";

    const res = await postRequest(post, 400);

    expect(res.body.error).toContain(
      "author: Cast to ObjectId failed for value",
    );
  });

  test("returns 400 if title is missing", async () => {
    const post = getPostTemplate();
    delete post["title"];

    const res = await postRequest(post, 400);

    expect(res.body.error).toContain("`title` is required");
  });

  test("returns 400 if title is empty or whitespace", async () => {
    const post = getPostTemplate();
    post.title = "   ";

    const res = await postRequest(post, 400);

    expect(res.body.error).toContain("`title` is required");
  });

  test("returns 400 if contents is missing", async () => {
    const post = getPostTemplate();
    delete post["contents"];

    const res = await postRequest(post, 400);

    expect(res.body.error).toContain("`contents` is required");
  });

  test("returns 400 if contents is empty or whitespace", async () => {
    const post = getPostTemplate();
    post.contents = "  ";

    const res = await postRequest(post, 400);

    expect(res.body.error).toContain("`contents` is required");
  });

  test("returns 400 if tags is empty or whitespace", async () => {
    const post = getPostTemplate();
    post.tags = ["  "];

    const res = await postRequest(post, 400);

    expect(res.body.error).toContain("`tags` is required");
  });
});
