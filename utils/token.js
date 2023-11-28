import jwt from "jsonwebtoken";
import * as ENV from "../configs/root.js";
import { UserModel } from "../models/user.model.js";

const generateAccessToken = async ({ uid, role }) => {
  return new Promise((resolve, reject) => {
    let accessToken = jwt.sign(
      {
        user: { id: uid, role: role },
      },
      ENV.SECURITY.TOKEN["ACCESS_TOKEN_PRIVATE_KEY"],
      { expiresIn: ENV.SECURITY.TOKEN["ACCESS_TOKEN_EXP"] }
    );
    // push to db
    UserModel.findByIdAndUpdate(uid, {
      accessToken: accessToken,
      expiresIn: ENV.SECURITY.TOKEN["ACCESS_TOKEN_EXP"],
    })
      .then(() => resolve(accessToken))
      .catch((error) => reject(error));
  });
};

const generateRefreshToken = async ({ uid, role }) => {
  return new Promise((resolve, reject) => {
    let refreshToken = jwt.sign(
      {
        user: { id: uid, role: role },
      },
      ENV.SECURITY.TOKEN["REFRESH_TOKEN_PRIVATE_KEY"],
      { expiresIn: ENV.SECURITY.TOKEN["REFRESH_TOKEN_EXP"] }
    );
    // push to db
    UserModel.findByIdAndUpdate(uid, {
      refreshToken: refreshToken,
      expiresIn: ENV.SECURITY.TOKEN["REFRESH_TOKEN_EXP"],
    })
      .then(() => resolve(refreshToken))
      .catch((error) => reject(error));
  });
};

export { generateAccessToken, generateRefreshToken };
