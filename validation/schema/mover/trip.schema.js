import Joi from "joi";
import { getErrorMessages } from "../../../utils/getMessageError.js";
import detectedBad from "../../../utils/modifyText/detectBad.js";
import { enumState } from "../../../utils/enums.js";

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
		mover_id: Joi.number().integer().min(1).max(1e7).required(),
	}),
	params: Joi.object({
		id: Joi.number().integer().required().min(1).max(1e7),
	}),
	query: Joi.object({}),
	empty: Joi.object({}),
	queryValidation: Joi.object({
		trip_id: Joi.number().integer().required().min(1).max(1e7),
		mover_id: Joi.number().integer().required().min(1).max(1e7),
		state: Joi.string().valid(
			enumState.resting,
			enumState.loading,
			enumState.on_mission,
			enumState.done
		).required(),
	}),
	queryValidationUser: Joi.object({
		user_id: Joi.number().integer().required().min(2).max(1e7),
	}),
};
