import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
export let errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = error.statusCode || StatusCodes.BAD_REQUEST;
    let errorMessage = error.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        error: errorMessage,
    });
};
