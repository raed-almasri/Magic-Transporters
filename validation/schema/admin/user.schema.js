import Joi from "joi";
import { getRegular } from "../../../utils/regularExpression.js";
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
		email: Joi.string()
			.trim()
			.pattern(getRegular("email"))
			.min(3)
			.max(50)
			.required()
			.messages(getErrorMessages("email"))
			.custom((value, helpers) => {
				let checkResult = detectedBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
		password: Joi.string()
			.min(8)
			.max(50)
			.custom((value, helpers) => {
				let checkResult = detectedBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			})
			.messages(getErrorMessages("password")),
	}),
	params: Joi.object({
		id: Joi.number().integer().required().min(2).max(1e7),
	}),
	userId: Joi.object({
		user_id: Joi.number().integer().required().min(2).max(1e7),
	}),
	query: Joi.object({}),
	empty: Joi.object({}),
};
