import { UserModel } from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    let { username } = req.body;
    // checkpoint
    let user = await UserModel.findOne({ username });

    // if undefined
    if (!user)
      return res.status(404).json({
        status: "error",
        errors: [
          {
            message: "The Username you entered doesn't belong to any account",
            code: 404,
          },
        ],
      });
    // if defined
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
