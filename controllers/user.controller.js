import { UserModel } from "../models/user.model.js";

const getUser = async (req, res) => {
  try {
    let { username } = req.params;
    // if invalid query
    if (!username)
      return res.status(400).json({
        status: "error",
        errors: [
          {
            message: "Invalid query",
            code: 400,
          },
        ],
      });

    // if valid
    // checkpoint
    let user = await UserModel.findOne({ username });

    // if user is undefied
    if (!user)
      return res.status(404).json({
        status: "error",
        errors: [
          {
            message: "User not found",
            code: 404,
          },
        ],
      });

    // if defined
    let { password, accessToken, refreshToken, ...next } = user._doc;
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "OK",
      data: { ...next },
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

export { getUser };
