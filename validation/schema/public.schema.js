import Joi from "joi";

import { getErrorMessages, message } from "../../utils/getMessageError.js";
import detectedBad from "../../utils/modifyText/detectBad.js";

export const schema = {
	body: Joi.object({
		projectName: Joi.string()
			.trim()
			.min(3)
			.max(250)
			.required()
			.messages(getErrorMessages("projectName")),
		description: Joi.string()
			.trim()
			.min(3)
			.max(500)
			.required()
			.messages(getErrorMessages("description")),
		city: Joi.string()
			.trim()
			.min(3)
			.max(100)
			.required()
			.messages(getErrorMessages("city")),

		area: Joi.string()
			.trim()
			.min(3)
			.max(50)
			.required()
			.messages(getErrorMessages("area")),
	}),
	empty: Joi.object({}),
	params: Joi.object({
		id: Joi.number().integer().required().min(1).max(1e7),
	}),
	query: Joi.object({
		size: Joi.number()
			.integer()
			.required()
			.min(1)
			.max(1e3)
			.messages(getErrorMessages("size")),
		page: Joi.number()
			.integer()
			.required()
			.min(1)
			.max(1e5)
			.messages(getErrorMessages("page")),
		lang: Joi.string().valid("en", "ar", "tr").required(),

		city: Joi.string()
			.trim()
			.max(100)
			.messages(getErrorMessages("city"))
			.custom((value, helpers) => {
				let checkResult = detectedBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
		area: Joi.string()
			.trim()
			.max(50)
			.messages(getErrorMessages("area"))
			.custom((value, helpers) => {
				let checkResult = detectedBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
		propertyType: Joi.string().valid("apartment", "villa", "house", "land"),
		status: Joi.string().valid("available", "sold", "deleted"),
		suitableForTurkishCitizenship: Joi.boolean(),
		numberOfRooms: Joi.number().integer().max(500),
		startPrice: Joi.number().max(Joi.ref("endPrice")).less(1e9),
		endPrice: Joi.number().less(1e9),
		search: Joi.string()
			.trim()
			.max(150)
			.messages(getErrorMessages("search"))
			.custom((value, helpers) => {
				let checkResult = detectedBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
	}),
	queryCars: Joi.object({
		size: Joi.number()
			.integer()
			.required()
			.min(1)
			.max(1e3)
			.messages(getErrorMessages("size")),
		page: Joi.number()
			.integer()
			.required()
			.min(1)
			.max(1e5)
			.messages(getErrorMessages("page")),

		manufacturingYear: Joi.number().integer().max(new Date().getFullYear()),
		carType: Joi.string().valid("benzin", "dizel"),
		carPresence: Joi.string().valid("Sakarya", "Istanbul"),
		startPrice: Joi.number().max(Joi.ref("endPrice")).less(1e9),
		endPrice: Joi.number().less(1e9),

		search: Joi.string()
			.trim()
			.max(150)
			.messages(getErrorMessages("search"))
			.custom((value, helpers) => {
				let checkResult = detectedBad(value);
				if (checkResult === "error") return helpers.message(message);
				else return checkResult;
			}),
	}),
	language: Joi.object({
		lang: Joi.string().valid("en", "ar", "tr").required(),
	}),
};
