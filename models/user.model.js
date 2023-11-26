import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  job: {
    type: String,
    default: "Freelancer"
  },
  phone: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photoUrl: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true,
    default: 3
  },
  isActived: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
});

const TokenSchema = mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
    createdAt: [{ required: true, default: Date.now() }],
    updatedAt: [{ required: true, default: Date.now() }],
    expiredIn: [{ required: true, type: String }],
  },
  refreshToken: {
    type: String,
    required: true,
    createdAt: [{ required: true, default: Date.now() }],
    updatedAt: [{ required: true, default: Date.now() }],
    expiredIn: [{ required: true, type: String }],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

export const UserModel = mongoose.Model("User", UserSchema);
export const TokenModel = mongoose.Model("Token", TokenSchema);