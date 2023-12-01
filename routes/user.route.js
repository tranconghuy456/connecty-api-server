import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as userController from "../controllers/user.controller.js";
import * as middleware from "../middlewares/root.js";

export const userRouter = Router();

userRouter
  .route("/login")
  .post(middleware.verifyUserByUsername, authController.login);
userRouter.route("/register").post(authController.register);
userRouter
  .route("/:username")
  .get(middleware.verifyAccessToken, userController.getUser)
  .put()
  .patch()
  .delete();

userRouter.route("/recover").post(authController.recover);
