import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import { MagicItems, MagicMover, MoverLogs, Trips } from "../../models/index.js";
import { Op, Sequelize } from "sequelize";
import { sequelize } from "../../utils/connect.js";
import { enumState } from "../../utils/enums.js";
export default {
	create: async (req, res, next) => {
		let check = await Trips.findOne({
			raw: true,
			attributes: ["id"],
			nest: true,
			where: { id: req.body.trip_id },
			include: {
				model: MagicMover,
				required: true,
				as: "magic_mover_info",
				attributes: ["id", "weight", "energy"],
				where: { user_id: req.user.id },
			},
		});
		if (!check) throw new Error(req.getLocalLanguage("error.trip.not_found"));

		if (
			await MagicItems.findOne({
				attributes: ["id"],
				raw: true,
				where: { name: req.body.name.trim(), trip_id: req.body.trip_id },
			})
		)
			throw new Error(req.getLocalLanguage("error.item.founded"));




		// if there is any other trip work
		if (
			await Trips.findOne({
				raw: true,
				attributes: ["id"],
				where: {
					id: { [Op.not]: req.body.trip_id },
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
					where: { user_id: req.user.id },
				},
			})
		)
			throw new Error(req.getLocalLanguage("error.trip.another_work"));






		let weight_all = await MagicItems.findAll({
			raw: true,
			attributes: [[Sequelize.fn("SUM", Sequelize.col("weight")), "sum"]],
			group: ["trip_id"],
			where: { trip_id: req.body.trip_id },
		});

		if (
			weight_all.length === 0 ||
			(req.body.weight <= check.magic_mover_info.weight - weight_all[0].sum &&
				req.body.weight < check.magic_mover_info.energy)
		)
			await sequelize.transaction(async (transaction) => {
				await MagicItems.create(
					{
						...req.body,
					},
					{ transaction }
				);
				await Trips.update(
					{
						quest_state: enumState.loading,
					},
					{ where: { id: req.body.trip_id }, transaction }
				);

				await MoverLogs.create(
					{
						state: enumState.loading,
						trip_id: req.body.trip_id,
					},
					{ transaction }
				);
			});
		else if (check.magic_mover_info.weight - weight_all[0].sum == 0)
			throw new Error(req.getLocalLanguage("error.item.full"));
		else throw new Error(req.getLocalLanguage("error.item.bigger_size"));
		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
	remove: async (req, res) => {
		let check = await MagicItems.findOne({
			raw: true,
			attributes: ["id"],
			nest: true,
			where: { id: req.params.id },
			include: {
				model: Trips,
				as: "trip_info",
				required: true,
				attributes: ["id"],
				include: {
					model: MagicMover,
					required: true,
					as: "magic_mover_info",
					attributes: ["id", "weight", "energy", "quest_state"],
					where: { user_id: req.user.id },
				},
			},
		});
		if (!check) throw new Error(req.getLocalLanguage("error.item.not_found"));

		await MagicItems.destroy({ where: { id: req.params.id } });
		res.status(StatusCodes.OK).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});

		if (
			await MagicItems.findOne({
				attributes: ["id"],
				raw: true,
				where: { name: req.body.name.trim(), trip_id: req.body.trip_id },
			})
		)
			throw new Error(req.getLocalLanguage("error.item.founded"));
		let weight_all = await MagicItems.findAll({
			raw: true,
			attributes: [[Sequelize.fn("SUM", Sequelize.col("weight")), "sum"]],
			group: ["trip_id"],
			where: { trip_id: req.body.trip_id },
		});

		if (
			weight_all.length === 0 ||
			(req.body.weight <= check.magic_mover_info.weight - weight_all[0].sum &&
				req.body.weight < check.magic_mover_info.energy)
		)
			await MagicItems.create({
				...req.body,
				magic_mover_id: req.body.mover_id,
			});
		else if (check.magic_mover_info.weight - weight_all[0].sum == 0)
			throw new Error(req.getLocalLanguage("error.item.full"));
		else throw new Error(req.getLocalLanguage("error.item.bigger_size"));
		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
};
