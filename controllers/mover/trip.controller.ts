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
import { Request, Response } from "express";
import { ITrip } from "../../typescript/index.js";
export default {
    create: async (req: Request, res: Response) => {
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
    update: async (req: Request, res: Response) => {
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
    remove: async (req: Request, res: Response) => {
        let check = await Trips.findOne({
            raw: true,
            attributes: ["id"],
            where: { id: req.params.id },
            nest: true,
        });

        if (!check)
            throw new Error(req.getLocalLanguage("error.trip.not_found"));
        await Trips.destroy({ where: { id: req.params.id } });
        res.status(StatusCodes.OK).json({
            success: true,
            msg: req.getLocalLanguage("messages.success"),
        });
    },
    fetchAll: async (req: Request, res: Response) => {
        let response: ITrip | any = await Trips.findAll({
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
            response.map(async (trip: ITrip) => {
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
    changeState: async (req: Request, res: Response) => {
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

        let check: ITrip | any = await Trips.findOne({
            raw: true,
            attributes: ["id", "quest_state"],
            where: {
                magic_mover_id: req.query.mover_id,
                id: req.query.trip_id,
            },
        });
        if (!check)
            throw new Error(req.getLocalLanguage("error.trip.not_found"));

        // if the state same new state
        if (req.query.state && check.quest_state == req.query.state)
            throw new Error(
                req.getLocalLanguage("error.trip.must_change_state")
            );

        // if state is on mission then can't load any more items
        if (
            (check.quest_state == enumState.on_mission &&
                req.query.state == enumState.loading) ||
            (check.quest_state == enumState.done &&
                req.query.state != enumState.done)
        )
            throw new Error(req.getLocalLanguage("error.trip.failed"));

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
                    quest_state: req.query.state,
                },
                { where: { id: req.query.trip_id }, transaction }
            );

            await MoverLogs.create(
                {
                    state: req.query.state,
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
