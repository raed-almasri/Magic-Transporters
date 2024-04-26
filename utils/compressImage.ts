import sharp from "sharp";
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";

import { Request } from "express";
import { moveFile } from "./helper";
export async function convertToWebp(inputFilename: string, req: Request) {
    try {
        const outputDirectory = "images";
        const dimensions = [
            { width: 200, height: 200 },
            { width: 400, height: 400 },
            { width: 1027, height: 400 },
        ];

        return await Promise.all(
            dimensions.map(async (dimension) => {
                // console.log("compress image starting ");
                const outputFilename = `${path.parse(inputFilename).name}_${
                    dimension.width
                }x${dimension.height}.webp`;
                // console.log(outputFilename);
                sharp(inputFilename, { failOn: "truncated" })
                    .resize(dimension.width, dimension.height)
                    .toFormat("webp", {
                        quality: 50,
                    })
                    .toFile(outputFilename, async (err, info) => {
                        if (err) {
                            // console.log({ error: err }, 222222);
                            return { error: err };
                        } else {
                            moveFile(
                                path.resolve() + "\\" + outputFilename,
                                path.resolve() +
                                    "\\" +
                                    outputDirectory +
                                    "\\" +
                                    outputFilename
                            );
                        }
                    });
                return outputFilename;
            })
        ).then((e) => {
            return e;
        });
    } catch (error) {}
}

export async function removePic(filePath: string) {
    try {
        const fileHandle = await fs.promises.open(filePath, "r+");
        await fileHandle.close();
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        await fs.promises.unlink(filePath);
    } catch (error: any) {
        if (error.code === "ENOENT") {
        }
    }
}
