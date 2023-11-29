export const verifyOTP = async (req, res, next) => {
  try {
    let { code } = req?.query || req?.body;

    // if invalid
    if (!code) {
      return res.status(400).json({
        status: "error",
        errors: [
          {
            message: "Invalid OTP code",
            field: "otp",
          },
        ],
      });
    }

    // if valid
    // checkpoint
    if (parseInt(code) === parseInt(req.app.locals.OTP)) {
      req.app.locals.OTP = null; // reset otp
      req.app.locals.Session = null; // logout
      // success
      next();
    }
    // error
    return res.status(400).json({
      status: "error",
      errors: [
        {
          message: "Invalid OTP code",
          code: 400,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      errors: [
        {
          message: "Internal server error",
          code: 500,
        },
      ],
    });
  }
};
