import AppError from "../utils/AppError.js";

const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  error.statusCode = err.statusCode || 500;
  if (err.name === "CastError") {
    error = new AppError("Invalid ID format", 400);
  }

  if (err.code === 11000) {
    error = new AppError("Duplicate field value entered", 409);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map(el => el.message)
      .join(", ");
    error = new AppError(message, 400);
  }

  /* ------------------ JWT ERRORS ------------------ */

  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token, please login again", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired, please login again", 401);
  }

  /* ------------------ RESPONSE ------------------ */

  res.status(error.statusCode).json({
    status: error.status || "error",
    message: error.message || "Internal Server Error",
  });
};

export default errorMiddleware;

