import { ErrorRequestHandler } from "express";

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
};
