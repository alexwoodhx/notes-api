import User from "./user.model.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

//check if user already exists, if not, create new user
export const registerUser = async ({email, password}) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

    const user = new User({ email, password});
    await user.save();

    return user;
};

//Check credentials and assign JWT
export const loginUser = async ({email, password}) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid password");

    const token = jwt.sign( {userId: user._id}, env.jwtSecret, {
        expiresIn: env.jwtExpiresIn,
    });

    return { user, token };
}