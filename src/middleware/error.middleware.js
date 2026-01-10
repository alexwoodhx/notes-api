import { env } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  const response = {
    message: err.message || "Internal Server Error",
  };

  if (env.nodeEnv !== "production") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
};
