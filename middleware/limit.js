import { StatusCodes } from "http-status-codes";
import rateLimit from "express-rate-limit";

export const limit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000,
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    // legacyHeaders: false, // Disable the X-RateLimit-* headers,
    statusCode: StatusCodes.TOO_MANY_REQUESTS, //status code response
    // skipSuccessfulRequests: false,
    message: {
        success: false,
        message:
            "Too many requests from this IP, please try again after 15 minutes :) ",
        // data: {},
    },
});

export const limitLogin = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 20,
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    // legacyHeaders: false, // Disable the X-RateLimit-* headers,
    statusCode: StatusCodes.TOO_MANY_REQUESTS, //status code response
    // skipSuccessfulRequests: false,
    message: {
        success: false,
        message:
            "Too many requests from this device, please try again after 2 minutes :) ",
        // data: {},
    },
});
 
