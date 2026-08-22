export const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        name: err.name || "Error",
        message: err.message || "Internal Server Error",
        error: err.stack
    });
};
//# sourceMappingURL=globalErrorHandler.js.map