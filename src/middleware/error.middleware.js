export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Something went wrong";

    res.status(statusCode).json({
        status: err.status || "error",
        message,
    });
};