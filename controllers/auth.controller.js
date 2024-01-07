import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hashing.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { SECURITY } from "../configs/security.js";

const register = async (req, res) => {
  try {
    let reqData = req.body;
    let client = req.get("host") || undefined;
    var { _requestID, _ref, password, email, username, ...next } = reqData;

    // checking existance
    let user = await UserModel.findOne({ email });
    // if email is exist
    if (user) {
      return res.status(409).json({
        _requestID,
        _ref: ["#email"],
        client,
        status: {
          message: "The email is already in use",
          code: 409,
        },
      });
    } else if (user && user?.username) {
      return res.status(409).json({
        _requestID,
        _ref: ["#username"],
        client,
        status: {
          message: "The username is already in use",
          code: 409,
        },
      });
    }
    // passed
    // hash password
    let hashedPwd = await hashPassword(password, SECURITY.SALT_ROUNDS);
    // push profile to db
    new UserModel({
      username,
      email,
      password: hashedPwd,
      ...next,
    })
      .save()
      .then(({ MFARequired, verified, createdAt }) => {
        // if succeed
        return res.status(201).json({
          _requestID,
          _ref,
          client,
          data: {
            user: {
              username,
              email,
              password: hashedPwd,
              ...next,
            },
            MFARequired,
            verified,
            createdAt,
          },
          status: {
            message: "The account was created successfully",
            code: 201,
          },
        });
      })
      .catch(() => {
        throw new Error();
      });
  } catch (error) {
    return res.status(500).json({
      _requestID,
      _ref,
      client,
      status: {
        message: "Internal server error",
        code: 500,
      },
    });
  }
};

const login = async (req, res) => {
  try {
    let client = req.get("host") || undefined;
    let reqData = req.body;
    let { _requestID, _ref } = reqData;

    // if invalid data
    if (!reqData.username) {
      return res.status(400).json({
        _requestID,
        _ref,
        client,
        status: {
          message: "Invalid param(S)",
          code: 400,
        },
      });
    }

    // if valid
    let { username, password } = reqData;
    // define user
    let user = await UserModel.findOne({ username: username });
    // if undefined user
    if (!user) {
      return res.status(404).json({
        _requestID,
        _ref: ["#username"],
        client,
        status: {
          message: "The username you enterd doesn't belong to any account",
          code: 404,
        },
      });
    }

    // if defined
    // compare password
    let comparedPwd = await comparePassword(password, user.password);
    // if not match
    if (!comparedPwd) {
      return res.status(401).json({
        _requestID,
        _ref: ["#password"],
        client,
        status: {
          message: "The password is incorred",
          code: 401,
        },
      });
    }

    // if match
    // generate token
    let accessToken = await generateAccessToken({
      uid: user._id.toHexString(),
      role: user.role,
    });
    let refreshToken = await generateRefreshToken({
      uid: user._id.toHexString(),
      role: user.role,
    });
    // save access token to cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
    });
    // save refresh token to cookie
    // res.cookie("refresh_token", refreshToken, {
    //   httpOnly: true,
    // });
    req.app.locals.Session = refreshToken;

    return res.status(200).json({
      _requestID,
      _ref,
      client,
      data: {
        accessToken,
      },
      status: {
        message: "Login successfully",
        code: 200,
      },
    });
  } catch (error) {
    return res.status(500).json({
      _requestID,
      _ref,
      client,
      status: {
        message: "Internal server error",
        code: 500,
      },
    });
  }
};

const recover = async (req, res) => {
  try {
    let { email, password } = req.body;

    // checkpoint
    let user = await UserModel.findOne({ email });
    // if undefined
    if (!user) {
      return res.status(400).json({
        status: "error",
        errors: [
          {
            message: "The Email you entered doesn't belong to any account",
            code: 400,
            field: "email",
          },
        ],
      });
    }
    // if defined
    // hashing password
    let hashedPwd = await hashPassword(password, ENV.SECURITY.SALT_ROUNDS);

    // updating
    UserModel.findOneAndUpdate(
      { _id: user._id.toHexString() },
      { password: hashedPwd },
      { new: true }
    )
      .then((result) => {
        return res.sendStatus(204).end();
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      errors: [
        {
          message: "Internal server error",
          code: 500,
          data: error,
        },
      ],
    });
  }
};

export { register, login, recover };
