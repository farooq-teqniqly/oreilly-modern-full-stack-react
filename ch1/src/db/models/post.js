import mongoose, { Schema } from "mongoose";

const validateString = (v) => v.trim().length > 0;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validateString(v),
        message: "`title` is required",
      },
    },
    author: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validateString(v),
        message: "`author` is required",
      },
    },
    contents: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validateString(v),
        message: "`contents` is required",
      },
    },
    tags: [String],
  },
  { timestamps: true },
);

export const Post = mongoose.model("post", postSchema);
