import Joi from "joi";
 
export const schema = {
	body: Joi.object({
		weight: Joi.number().integer().max(1e7).required(),
		energy: Joi.number().integer().max(1e7).required(),
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
