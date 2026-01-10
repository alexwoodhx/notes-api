import { registerUser, loginUser } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    message: "User created",
    userId: user._id,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { token } = await loginUser(req.body);
  res.json({ token });
});
