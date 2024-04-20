import dotenv from "dotenv";

dotenv.config({ path: `../.env` });
import { StatusCodes } from "http-status-codes";

export const authorization = (type) => {
	return async (req, res, next) => {
		try {
			if (type !== req.user.role)
				throw new Error("Sorry,You don't have any access during this endpoint");
			next();
		} catch (err) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				error: err.message,
			});
		}
	};
};
