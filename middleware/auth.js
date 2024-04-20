import dotenv from "dotenv";

dotenv.config({ path: `../.env` });
import { StatusCodes } from "http-status-codes";

import { verifyToken } from "../utils/jwt.js";
import { getFromCache } from "./cache.js";

export const auth = async (req, res, next) => {
	try {
		let rawToken = req.headers.authorization || req.headers.Authorization;
		if (!rawToken)
			throw Error("Token not exists, please set token and  try again :) ");
		if (rawToken.startsWith("Bearer "))
			rawToken = rawToken.replace("Bearer ", "");
 
		let decoded = verifyToken(rawToken, process.env.TOKEN_SECRET_KEY);
		if (!decoded || getFromCache(`refreshToken_${decoded.userId}`))
			throw Error("forbidden token");
		req.user = {
			id: decoded.userId,
			deviceId: decoded.deviceId,
			role: decoded.role,
		};

		next();
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			error: err.message,
		});
	}
};
