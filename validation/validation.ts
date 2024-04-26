import { StatusCodes } from "http-status-codes";

import { enumTypeInput as type } from "../utils/enums.js";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: any, typeSchema: string) => {
    let result: any = false;
    return (req: Request, res: Response, next: NextFunction) => {
        switch (typeSchema) {
            //validate body
            case type.body:
                result = schema.validate(req.body);
                break;
            ///validate query
            case type.query:
                result = schema.validate(req.query);
                break;
            ///validate params
            case type.params:
                result = schema.validate(req.params);
                break;
        }
        if (result.error) {
            const { details } = result.error;
            const message = details.map((i: any) => i.message).join(" , ");
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: message,
            });
        }
        next();
    };
};
