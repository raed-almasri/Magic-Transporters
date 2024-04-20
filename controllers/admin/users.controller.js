import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import { MagicItems, MagicMover, MoverLogs, Trips, Users } from "../../models/index.js";
import { enumRoles } from "../../utils/enums.js";
import { Op } from "sequelize";
export default {
	create: async (req, res, next) => {
		let check = await Users.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				email: req.body.email.trim(),
			},
		});
		if (check) throw new Error(req.getLocalLanguage("error.users.found"));

		await Users.create({
			...req.body,
			verification_email: false,
			role: enumRoles.mover,
		});

		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
	update: async (req, res) => {
		let checkForEmail = await Users.findOne({
			raw: true,
			attributes: ["id"],
			where: {
				email: req.body.email.trim(),
				id: { [Op.not]: req.params.id },
			},
		});
		if (checkForEmail)
			throw new Error(req.getLocalLanguage("error.users.found"));

		await Users.update(
			{
				...req.body,
			},
			{
				where: { id: req.params.id },
			}
		);

		res.status(StatusCodes.CREATED).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
	remove: async (req, res) => {
		let check = await Users.findOne({
			raw: true,
			attributes: ["id"],
			where: { id: req.params.id },
			nest: true,
		});

		if (!check) throw new Error(req.getLocalLanguage("error.car.not_found"));

		await Users.destroy({ where: { id: req.params.id } });
		res.status(StatusCodes.OK).json({
			success: true,
			msg: req.getLocalLanguage("messages.success"),
		});
	},
	fetchAll: async (req, res) => {
		let response = await Users.findAll({
			raw: true,
			attributes: ["id", "name", "email", "role"],
		});

		res.status(StatusCodes.OK).json({
			success: true,
			data: response,
		});
	},
	fetchAllMoverForUser: async (req, res) => {
		if (
			!(await Users.findOne({
				raw: true,
				attributes: ["id"],
				where: { id: req.query.user_id },
			}))
		)
			throw new Error(req.getLocalLanguage("error.users.not_found"));
		let response = await MagicMover.findAll({
			raw: true,
			attributes: ["id", "weight", "energy", "createdAt"],
			nest:true,
			include: {
				raw: true,
				required: true,
				as: "profile_info",
				model: Users,
				attributes: ["id", "name", "email", "picture"],
				where: { id: req.query.user_id },
			},
		});
		response = await Promise.all(
			response.map(async (mover) => {
				let trips = await Trips.findAll({
					raw: true,
					attributes: { exclude: ["magic_mover_id"] },
					nest: true,
					include: {
						model: MagicMover,
						required: true,
						as: "magic_mover_info",
						attributes: { exclude: ["user_id"] },
						where: { id: mover.id },
					},
				});

				trips = await Promise.all(
					trips.map(async (trip) => {
						let magic_items = await MagicItems.findAll({
							raw: true,
							attributes: ["id", "name", "weight", "createdAt"],
							where: { trip_id: trip.id },
						});

						let magic_logs = await MoverLogs.findAll({
							raw: true,
							attributes: ["id", "state", "createdAt"],
							where: { trip_id: trip.id },
						});
						return {
							...trip,
							magic_items,
							magic_logs
						};
					})
				);

				return {
					...mover,
					trips,
				};
			})
		);

		res.status(StatusCodes.OK).json({
			success: true,
			data: response,
		});
	},
};
