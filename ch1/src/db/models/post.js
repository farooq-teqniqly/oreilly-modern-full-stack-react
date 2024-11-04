import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: (v) => v.trim().length > 0,
        message: "`title` is required",
      },
    },
    author: {
      type: String,
      required: true,
      validate: {
        validator: (v) => v.trim().length > 0,
        message: "`author` is required",
      },
    },
    contents: {
      type: String,
      required: true,
      validate: {
        validator: (v) => v.trim().length > 0,
        message: "`contents` is required",
      },
    },
    tags: [String],
  },
  { timestamps: true },
);

export const Post = mongoose.model("post", postSchema);
