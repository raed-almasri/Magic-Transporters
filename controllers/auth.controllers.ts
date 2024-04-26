import { StatusCodes } from "http-status-codes";

import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config({ path: `../.env` });
//UTILS
import { compare } from "../utils/bcrypt.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import {
    addToCache,
    getFromCache,
    deleteFromCache,
} from "../middleware/cache.js";
import { Users, RefreshToken } from "../models/index.js";

import { Request, Response, NextFunction } from "express";
import { IUser } from "../typescript/index.js";
export default {
    /*
     * @auth
     * @public
     * @method POST
     * @work login
     */
    login: async (req: Request, res: Response) => {
        const myInfo: IUser | any = await Users.findOne({
            attributes: ["id", "password", "role", "verification_email"],
            where: { email: req.body.email.trim() },
        });

        if (!myInfo)
            throw Error(req.getLocalLanguage("error.auth.email_incorrect"));

        const validPassword = await compare(req.body.password, myInfo.password);
        if (!validPassword)
            throw Error(req.getLocalLanguage("error.auth.password_incorrect"));

        let deviceId = uuidv4();
        let token = generateToken(
            {
                userId: myInfo.id,
                deviceId,
                role: myInfo.role,
                verification_email: myInfo.verification_email,
            },
            process.env.TOKEN_SECRET_KEY as string,
            process.env.TOKEN_EXPIRES_IN as string
        );
        const refreshToken = generateToken(
            {
                userId: myInfo.id,
                deviceId,
            },
            process.env.REFRESH_TOKEN_SECRET_KEY as string,
            process.env.REFRESH_TOKEN_EXPIRES_IN as string
        );

        await RefreshToken.create({
            user_id: myInfo.id,
            refresh_token: refreshToken,
            deviceId,
            ip: req.ip,
        });

        deleteFromCache([
            `refreshToken_${myInfo.id}`,
            `refreshTokenNotValid_${myInfo.id}`,
        ]);

        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                token,
                refreshToken,
                role: myInfo.role,
                verification_email:
                    myInfo.verification_email === "0" ? false : true,
            },
        });
    },
    /*
     * @auth
     * @public
     * @method GET
     * @work logout
     */
    logout: async (req: Request, res: Response) => {
        RefreshToken.destroy({
            force: true,
            where: { user_id: req.user.id, deviceId: req.user.deviceId.trim() },
        });
        addToCache(`refreshToken_${req.user.id}`, "not allow");
        addToCache(`refreshTokenNotValid_${req.user.id}`, "not allow");
        res.status(StatusCodes.OK).json({
            success: true,
            msg: req.getLocalLanguage("messages.success"),
        });
    },
    /*
     * @auth
     * @public
     * @method PUT
     * @work refresh token
     */
    refreshToken: async (req: Request, res: Response) => {
        let { refreshToken } = req.body;
        if (!refreshToken)
            throw Error(req.getLocalLanguage("error.auth.not_found_token"));

        let decodedToken = verifyToken(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY as string
        );

        if (
            !decodedToken ||
            getFromCache(`refreshTokenNotValid_${decodedToken.userId}`)
        )
            throw Error(req.getLocalLanguage("error.auth.forbidden_token"));

        //! permission
        const myInfo: IUser | any = await Users.findOne({
            attributes: ["id"],
            where: { id: decodedToken.userId },
        });

        if (!myInfo)
            throw new Error(req.getLocalLanguage("error.users.not_found"));
        let deviceId = uuidv4();
        let token = generateToken(
            {
                userId: myInfo.id,
                deviceId,
            },
            process.env.TOKEN_SECRET_KEY as string,
            process.env.TOKEN_EXPIRES_IN as string
        );
        const newRefreshToken = generateToken(
            {
                userId: myInfo.id,
                deviceId,
            },
            process.env.REFRESH_TOKEN_SECRET_KEY as string,
            process.env.REFRESH_TOKEN_EXPIRES_IN as string
        );

        await RefreshToken.destroy({
            where: { user_id: myInfo.id, deviceId: decodedToken.deviceId },
        });
        await RefreshToken.create({
            user_id: myInfo.id,
            refresh_token: refreshToken,
            deviceId,
            ip: req.ip,
        });

        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                token,
                refreshToken: newRefreshToken,
            },
        });
    },
};
