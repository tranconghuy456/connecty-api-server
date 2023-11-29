import otpGenerator from "otp-generator";

const generateOTP = async (req, res) => {
  try {
    // generate otp
    let otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: true,
      specialChars: false,
    });

    if (!otp) throw new Error();
    // save otp code to local
    req.app.locals.OTP = otp;
    return res.status(201).json({
      status: "success",
      message: "Created",
      data: { code: otp },
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

export { generateOTP };
