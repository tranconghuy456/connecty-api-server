import { Router } from "express";
import * as secureController from "../controllers/secure.controller.js";
import * as middleware from "../middlewares/root.js";

export const secureRouter = Router();

secureRouter.route("/otp").get(secureController.generateOTP);
secureRouter
  .route("/otp/:code")
  .get(middleware.verifyOTP, (req, res) => res.end());
