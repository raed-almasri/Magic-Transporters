import _ from "lodash";
import { StatusCodes } from "http-status-codes";
// MODELS
import { MagicMover, Users } from "../../models/index.js";
import { enumRoles } from "../../utils/enums.js";

import { Request, Response } from "express";
export default {
    create: async (req: Request, res: Response) => {
        let user_id: any = req.query.user_id;
        let check = await Users.findOne({
            raw: true,
            attributes: ["id"],
            where: {
                id: user_id,
                role: enumRoles.mover,
            },
        });
        if (!check)
            throw new Error(req.getLocalLanguage("error.users.not_found"));

        await MagicMover.create({
            ...req.body,
            user_id: user_id,
        });
        res.status(StatusCodes.CREATED).json({
            success: true,
            msg: req.getLocalLanguage("messages.success"),
        });
    },
    update: async (req: Request, res: Response) => {
        let check = await MagicMover.findOne({
            raw: true,
            attributes: ["id"],
            where: {
                id: req.query.mover_id,
                user_id: req.query.user_id,
            },
            include: {
                model: Users,
                required: true,
                as: "profile_info",
                attributes: ["id"],
                where: { id: req.query.user_id, role: enumRoles.mover },
            },
        });

        if (!check)
            throw new Error(req.getLocalLanguage("error.car.not_found"));

        await MagicMover.update(
            { ...req.body },
            { where: { id: req.query.mover_id } }
        );

        res.status(StatusCodes.CREATED).json({
            success: true,
            msg: req.getLocalLanguage("messages.success"),
        });
    },
    remove: async (req: Request, res: Response) => {
        let check = await MagicMover.findOne({
            raw: true,
            attributes: ["id"],
            where: { id: req.query.mover_id, user_id: req.query.user_id },
            nest: true,
        });

        if (!check)
            throw new Error(req.getLocalLanguage("error.car.not_found"));

        await MagicMover.destroy({ where: { id: req.query.mover_id } });
        res.status(StatusCodes.OK).json({
            success: true,
            msg: req.getLocalLanguage("messages.success"),
        });
    },
};
