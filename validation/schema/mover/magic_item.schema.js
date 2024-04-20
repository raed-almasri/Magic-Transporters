import Joi from "joi";
import { getErrorMessages } from "../../../utils/getMessageError.js";
import detectedBad from "../../../utils/modifyText/detectBad.js";
 
export const schema = {
	body: Joi.object({
		name: Joi.string()
			.min(8)
			.max(50)
			.custom((value, helpers) => {
				let checkResult = detectedBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			})
			.messages(getErrorMessages("name")),
		weight: Joi.number().integer().max(1e7).required(),
		trip_id: Joi.number().integer().max(1e7).required(),
	}),
	params: Joi.object({
		id: Joi.number().integer().required().min(1).max(1e7),
	}),
	query: Joi.object({}),
	empty: Joi.object({}),
	queryValidation: Joi.object({
		user_id: Joi.number().integer().required().min(2).max(1e7),
		mover_id: Joi.number().integer().required().min(1).max(1e7),
	}),
	queryValidationUser: Joi.object({
		user_id: Joi.number().integer().required().min(2).max(1e7),
	}),
};
