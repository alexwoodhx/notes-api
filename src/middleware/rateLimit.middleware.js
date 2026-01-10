import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    handler: (req, res) => {
        return res.status(429).json({
            message: "Too many login attempts. Please try again later."
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
  