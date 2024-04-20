import dotenv from "dotenv";

dotenv.config({ path: `../.env` });
import { StatusCodes } from "http-status-codes";

 
export const verifyEmail = async (req, res, next) => {
	try {
		if (!req.user.verification_email)
			throw Error(req.getLocalLanguage("validation.email"));

		next();
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			error: err.message,
		});
	}
};
