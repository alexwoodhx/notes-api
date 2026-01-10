import User from "./user.model.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { AppError } from "../../utils/AppError.js";

// Register a new user
export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const user = new User({ email, password });
  await user.save();

  return user;
};

// Check credentials and assign JWT
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  // Deliberately vague for security
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { userId: user._id },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );

  return { user, token };
};
