import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import { MagicMover, Trips, Users } from "../../models/index.js";
import { Op } from "sequelize";
import { enumState } from "../../utils/enums.js";

export default {
	fetchAllMyMover: async (req, res) => {
		let response = await MagicMover.findAll({
			raw: true,
			attributes: ["id", "weight", "energy", "createdAt"],
			where: { user_id: req.user.id },
		});

		response = await Promise.all(
			response.map(async (mover) => {
				let state = await Trips.findOne({
					raw: true,
					attributes: ["quest_state"],
					where: {
						magic_mover_id: mover.id,
						quest_state: { [Op.not]: enumState.done },
						quest_state: { [Op.not]: enumState.init },
					},
				});
				return { ...mover, quest_state: state.quest_state };
			})
		);
		res.status(StatusCodes.OK).json({
			success: true,
			data: response,
		});
	},
};
