import { Router } from "express";

export const userRouter = Router();

// post method
userRouter.route("/login").post((req, res, next) => console.log("ok"));
userRouter.route("/register").post();

// get method
userRouter.route("/:username").get();

// put method
userRouter.route("/update/:username").put();

// delete method
userRouter.route("/delete/:username").delete();
