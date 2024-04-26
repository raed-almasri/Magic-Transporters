import { auth } from "../middleware/auth.js";
import { validate } from "../validation/validation.js";
import { enumTypeInput } from "../utils/enums.js";
import { removePic } from "../utils/helper.js";
import fsExtra from "fs-extra";
import fileProcessing from "../utils/fileprocissing.js";

import { Request, Response, NextFunction } from "express";
const execute =
    (fun: Function) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fun(req, res, next)).catch(async (error) => {
            if (req.files)
                await Promise.all(
                    req.files.map((item: any) => {
                        fileProcessing.deleteFile(item.filename);
                    })
                );
            if (req.file && (await fsExtra.pathExists(req.file.path))) {
                try {
                    await removePic(req.file.path);
                } catch (error) {}
            }
            if (error.code == "ENOENT") {
            } else next(error);
        });
    };
export { auth, execute, validate, enumTypeInput as type };
