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
import { enumRoles } from "../../utils/enums.js";
import { Op } from "sequelize";

import { Request, Response } from "express";
import {
    IMagicMoverWithProfile,
    ITrip,
    ITripWithMagicMover,
} from "../../typescript/index.js";
export default {
    create: async (req: Request, res: Response) => {
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
    update: async (req: Request, res: Response) => {
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
    remove: async (req: Request, res: Response) => {
        let check = await Users.findOne({
            raw: true,
            attributes: ["id"],
            where: { id: req.params.id },
            nest: true,
        });

        if (!check)
            throw new Error(req.getLocalLanguage("error.car.not_found"));

        await Users.destroy({ where: { id: req.params.id } });
        res.status(StatusCodes.OK).json({
            success: true,
            msg: req.getLocalLanguage("messages.success"),
        });
    },
    fetchAll: async (req: Request, res: Response) => {
        let response = await Users.findAll({
            raw: true,
            attributes: ["id", "name", "email", "role"],
        });

        res.status(StatusCodes.OK).json({
            success: true,
            data: response,
        });
    },
    fetchAllMoverForUser: async (req: Request, res: Response) => {
        if (
            !(await Users.findOne({
                raw: true,
                attributes: ["id"],
                where: { id: req.query.user_id },
            }))
        )
            throw new Error(req.getLocalLanguage("error.users.not_found"));
        let response: IMagicMoverWithProfile | any = await MagicMover.findAll({
            raw: true,
            attributes: ["id", "weight", "energy", "createdAt"],
            nest: true,
            include: [
                {
                    required: true,
                    as: "profile_info",
                    model: Users,
                    attributes: ["id", "name", "email", "picture"],
                    where: { id: req.query.user_id },
                },
            ],
        });
        response = await Promise.all(
            response.map(async (mover: IMagicMoverWithProfile) => {
                let trips: ITripWithMagicMover | any = await Trips.findAll({
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
                    trips.map(async (trip: ITrip) => {
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
                            magic_logs,
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
