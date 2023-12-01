import mongoose from "mongoose";
import * as ENV from "../configs/root.js";

// init Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      max: [20, "Firstname too long (MAX: 20)"],
      required: true,
    },
    lastname: {
      type: String,
      max: [20, "Lastname too long (MAX: 20)"],
      required: true,
    },
    age: {
      type: Number,
    },
    job: {
      type: String,
      default: "Freelancer",
    },
    phone: {
      type: Number,
    },
    username: {
      type: String,
      required: true,
      unique: [true, "The Username must be unique"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "The Email must be unique"],
      validate: {
        validator: (value) => {
          return ENV.SECURITY.REGEX["EMAIL"].test(value);
        },
        message: "Invalid Email address",
      },
    },
    photoUrl: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default: 3,
    },
    isActived: {
      type: Boolean,
      required: true,
      default: true,
    },
    accessToken: {
      type: String,
      createdAt: [{ type: Date, required: true, default: Date.now() }],
      updatedAt: [{ type: Date, required: true, default: Date.now() }],
      expiredIn: [{ required: true, type: String }],
    },
    refreshToken: {
      type: String,
      createdAt: [{ required: true, default: Date.now() }],
      updatedAt: [{ required: true, default: Date.now() }],
      expiredIn: [{ required: true, type: String }],
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
