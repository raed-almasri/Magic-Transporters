import { StatusCodes } from "http-status-codes";
export let errorHandler = (error, req, res, next) => {
 
    let statusCode = error.statusCode || StatusCodes.BAD_REQUEST;
    let errorMessage = error.message || "Internal Server Error"; 
    return res.status(statusCode).json({
        success: false,
        error: errorMessage,
    });
};
