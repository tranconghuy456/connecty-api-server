import { Router } from "express";

export const userRouter = Router();

userRouter.route("/login").post();
userRouter.route("/register").post();
userRouter.route("/:username").get().put().patch().delete();