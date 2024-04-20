import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import {
	MagicItems,
	MagicMover,
	MoverLogs,
	Trips,
	Users,
} from "../../models/index.js";
import { Op, Sequelize } from "sequelize";
import { enumState } from "../../utils/enums.js";
import { sequelize } from "../../utils/connect.js";
export default {
	create: async (req, res, next) => {
		if (
			!(await MagicMover.findOne({
				raw: true,
				attributes: ["id"],
				where: {
					id: req.body.mover_id,
					user_id: req.user.id,
				},
			}))
		)
			throw new Error(req.getLocalLanguage("error.car.not_found"));
		let check = await Trips.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				name: req.body.name.trim(),
				magic_mover_id: req.body.mover_id,
			},
		});
		if (check) throw new Error(req.getLocalLanguage("error.trip.founded"));

		await Trips.create({
			...req.body,
			magic_mover_id: req.body.mover_id,
			quest_state: enumState.init,
		});
		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
	update: async (req, res) => {
		if (
			!(await MagicMover.findOne({
				raw: true,
				attributes: ["id"],
				where: {
					id: req.body.mover_id,
					user_id: req.user.id,
				},
			}))
		)
			throw new Error(req.getLocalLanguage("error.car.not_found"));

		let check = await Trips.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				name: req.body.name.trim(),
				magic_mover_id: req.body.mover_id,
				id: { [Op.not]: req.params.id },
			},
		});
		if (check) throw new Error(req.getLocalLanguage("error.trip.founded"));

		await Trips.update(
			{
				...req.body,
				magic_mover_id: req.body.mover_id,
			},
			{ where: { id: req.params.id } }
		);
		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
	remove: async (req, res) => {
		let check = await Trips.findOne({
			raw: true,
			attributes: ["id"],
			where: { id: req.params.id },
			nest: true,
		});

		if (!check) throw new Error(req.getLocalLanguage("error.trip.not_found"));
		await Trips.destroy({ where: { id: req.params.id } });
		res.status(StatusCodes.OK).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
	fetchAll: async (req, res) => {
		let response = await Trips.findAll({
			raw: true,
			attributes: { exclude: ["magic_mover_id"] },
			nest: true,
			include: {
				model: MagicMover,
				required: true,
				as: "magic_mover_info",
				attributes: { exclude: ["user_id"] },
				where: { user_id: req.user.id },
			},
		});

		response = await Promise.all(
			response.map(async (trip) => {
				let magic_items = await MagicItems.findAll({
					raw: true,
					attributes: ["id", "name", "weight", "createdAt"],
					where: { trip_id: trip.id },
				});
				return {
					...trip,
					magic_items,
				};
			})
		);
		res.status(StatusCodes.OK).json({
			success: true,
			data: response,
		});
	},
	changeState: async (req, res) => {
		//! check if a mover and a trip for this mover user
		if (
			!(await MagicMover.findOne({
				raw: true,
				attributes: ["id"],
				where: {
					id: req.query.mover_id,
					user_id: req.user.id,
				},
			}))
		)
			throw new Error(req.getLocalLanguage("error.car.not_found"));

		let check = await Trips.findOne({
			raw: true,
			attributes: ["id", "quest_state"],
			where: {
				magic_mover_id: req.query.mover_id,
				id: req.query.trip_id,
			},
		});
		if (!check) throw new Error(req.getLocalLanguage("error.trip.not_found"));

		// if the state same new state
		if (check.quest_state == req.query.state.trim())
			throw new Error(req.getLocalLanguage("error.trip.must_change_state"));

		// if state is on mission then can't load any more items
		if (
			(check.quest_state == enumState.on_mission &&
				req.query.state.trim() == enumState.loading) ||
			(check.quest_state == enumState.done &&
				req.query.state.trim() != enumState.done)
		)
			throw new Error(req.getLocalLanguage("error.trip.failed"));
		console.log(112);
		// if there is any other trip work
		if (
			await Trips.findOne({
				raw: true,
				attributes: ["id"],
				where: {
					id: { [Op.not]: req.query.trip_id },
					[Op.or]: [
						{
							quest_state: "resting",
						},
						{
							quest_state: "loading",
						},
						{
							quest_state: "on_mission",
						},
					],
				},
				include: {
					model: MagicMover,
					required: true,
					as: "magic_mover_info",
					attributes: ["id"],
					where: { id: req.query.mover_id },
				},
			})
		)
			throw new Error(req.getLocalLanguage("error.trip.another_work"));

		await sequelize.transaction(async (transaction) => {
			await Trips.update(
				{
					quest_state: req.query.state.trim(),
				},
				{ where: { id: req.query.trip_id }, transaction }
			);

			await MoverLogs.create(
				{
					state: req.query.state.trim(),
					trip_id: req.query.trip_id,
				},
				{ transaction }
			);
		});

		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
};
