import dotenv from "dotenv";

dotenv.config({ path: `../.env` });
import { StatusCodes } from "http-status-codes";

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { getFromCache } from "./cache.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let TOKEN_SECRET_KEY: string = process.env.TOKEN_SECRET_KEY || "";
        let rawToken: string = Array.isArray(req.headers.authorization)
            ? req.headers.authorization[0]
            : req.headers.authorization || req.headers.Authorization;

        if (!rawToken)
            throw Error(
                "Token not exists, please set token and  try again :) "
            );
        if (rawToken.startsWith("Bearer "))
            rawToken = rawToken.replace("Bearer ", "");

        let decoded = verifyToken(rawToken, TOKEN_SECRET_KEY);
        if (!decoded || getFromCache(`refreshToken_${decoded.userId}`))
            throw Error("forbidden token");
        req.user = {
            id: decoded.userId,
            deviceId: decoded.deviceId,
            role: decoded.role,
        };

        next();
    } catch (err: any) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: err.message,
        });
    }
};
