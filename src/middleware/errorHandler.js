const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Log the error with context
    console.error(`[${new Date().toISOString()}] Error ${statusCode}: ${err.message}`);
    if (isDevelopment && err.stack) {
        console.error(err.stack);
    }

    // Production-safe response
    const response = {
        success: false,
        message: statusCode === 500 && !isDevelopment
            ? "Something went wrong"
            : err.message,
    };


    res.status(statusCode).json(response);
};

export { errorHandler };