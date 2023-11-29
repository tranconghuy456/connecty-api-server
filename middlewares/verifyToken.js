import jwt, { decode } from "jsonwebtoken";
import * as ENV from "../configs/root.js";
import { UserModel } from "../models/user.model.js";
import { generateAccessToken } from "../utils/token.js";

const verifyAccessToken = async (req, res, next) => {
  try {
    let header = req.headers["x-access-token"] || req.headers["authorization"];

    // if header invalid
    if (!header?.startsWith("Bearer ")) {
      return res.status(400).json({
        status: "error",
        errors: [
          {
            message: "Invalid token",
            code: 400,
          },
        ],
      });
    }

    // checkpoint
    var token = header.split(" ")[1];

    // if session is expired
    if (!req.app.locals.Session) {
      return res.status(401).json({
        status: "error",
        errors: [
          {
            message: "Unauthorized! Session Expired",
            code: 401,
          },
        ],
      });
    }

    // if valid
    jwt.verify(
      token,
      ENV.SECURITY.TOKEN["ACCESS_TOKEN_PRIVATE_KEY"],
      async (error, payload) => {
        // if token is expired
        if (error && error.name == "TokenExpiredError") {
          try {
            // re-generate token
            let decoded = await verifyRefreshToken(req.app.locals.Session);
            token = await generateAccessToken({
              uid: decoded.uid,
              role: decoded.role,
            });
            // save token
            // cookie
            req.cookies["access_token"] = token;
            // db
            UserModel.findByIdAndUpdate(decoded.uid, {
              accessToken: token,
            }).catch((error) => {
              throw new Error(error);
            });
          } catch (error) {
            // reset session
            req.app.locals.Session = null;

            return res.status(401).json({
              status: "error",
              errors: [
                {
                  message: "Unauthorized! Session Expired",
                  code: 401,
                },
              ],
            });
          }
        } else if (error) {
          // reset session
          req.app.locals.Session = null;
          return res.status(400).json({
            status: "error",
            errors: [
              {
                message: "Invalid token",
                code: 400,
              },
            ],
          });
        }
        res.locals.payload = payload;
        next();
      }
    );
    // passing payload
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
    z;
  }
};

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      ENV.SECURITY.TOKEN["REFRESH_TOKEN_PRIVATE_KEY"],
      (error, payload) => {
        if (error || error.name == "TokenExpiredError") {
          reject();
        }
        // if succeed
        resolve(payload);
      }
    );
  });
};

export { verifyAccessToken };
