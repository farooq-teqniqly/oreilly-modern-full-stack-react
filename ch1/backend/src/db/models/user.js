import mongoose, { Schema } from "mongoose";

const validatePassword = (v) => v.trim().length >= 6 && v.trim().length <= 20;
const validateUsername = (v) => v.trim().length >= 4 && v.trim().length <= 50;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validateUsername(v),
      message: "`password` must be between 6 and 20 characters long",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validatePassword(v),
      message: "`password` must be between 4 and 50 characters long",
    },
  },
});

export const User = mongoose.model("user", userSchema);
