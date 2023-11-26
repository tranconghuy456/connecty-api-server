import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { hashPassword } from "../utils/hashing.js";
import * as ENV from "../configs/root.js";

const register = async (req, res) => {
    try {
        let data = req.body;

        // checking existance
        let user = await UserModel.findOne({email: data.email});
        // if email is exist
        if (user) {
            return res.status(409).json({
                status: "error",
                element: "email",
            });
        } else if (user.username) {
            // if username is exist
            return res.status(409).json({
                status: "error",
                element: "username",
            });
        }

        // passed
        // hash password
        let hashedPwd = await hashPassword(data.password, ENV.SECURITY.SALT_ROUNDS);
        // push profile to db
        new UserModel({
            data,
            password: hashedPwd
        }).save().then(() => {
            let {password, ...next} = data;
            // if succeed
            return res.status(201).json({
                status: "success",
                data: {next}
            });
        }).catch((error) => {
            return res.status(401).json({
                status: "error",
                error: error
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error
        })
    }
}

export {register}