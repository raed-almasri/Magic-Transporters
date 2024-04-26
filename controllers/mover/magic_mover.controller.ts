import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import { MagicMover, Trips } from "../../models/index.js";
import { Op } from "sequelize";
import { enumState } from "../../utils/enums.js";

import { Request, Response } from "express";
import { IMagicMover, ITrip } from "../../typescript/index.js";
export default {
    fetchAllMyMover: async (req: Request, res: Response) => {
        let response: IMagicMover | any = await MagicMover.findAll({
            raw: true,
            attributes: ["id", "weight", "energy", "createdAt"],
            where: { user_id: req.user.id },
        });

        response = await Promise.all(
            response.map(async (mover: IMagicMover) => {
                let state: ITrip | any = await Trips.findOne({
                    raw: true,
                    attributes: ["quest_state"],
                    where: {
                        magic_mover_id: mover.id,
                        quest_state: {
                            [Op.notIn]: [enumState.done, enumState.init],
                        },
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
