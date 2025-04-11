import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit per IP
  message: 'Too many requests. Please try again later.'
});
