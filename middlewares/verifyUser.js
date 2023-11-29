import { UserModel } from "../models/user.model.js";

const verifyUserByUsername = async (req, res, next) => {
  try {
    let { username } = req?.body || req?.params;

    // if invalid
    if (!username) {
      return res.status(400).json({
        status: "error",
        errors: [
          {
            message: "Invalid username",
            code: 400,
          },
        ],
      });
    }

    // checkpoint
    let user = await UserModel.findOne({ username }).select("username");

    // if undefined
    if (!user) {
      return res.status(404).json({
        status: "error",
        errors: [
          {
            message: "The Username you entered doesn't belong to any account",
            code: 404,
          },
        ],
      });
    }

    // if defined
    // passing
    next();
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

const verifyUserByEmail = async (req, res, next) => {
  try {
    let { email } = req?.body || req?.params;

    // if invalid
    if (!email) {
      return res.status(400).json({
        status: "error",
        errors: [
          {
            message: "Invalid email",
            code: 400,
          },
        ],
      });
    }

    // checkpoint
    let user = await UserModel.findOne({ email }).select("email");

    // if undefined
    if (!user) {
      return res.status(404).json({
        status: "error",
        errors: [
          {
            message: "The Email you entered doesn't belong to any account",
            code: 404,
          },
        ],
      });
    }

    // if defined
    // passing
    next();
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

export { verifyUserByEmail, verifyUserByUsername };
