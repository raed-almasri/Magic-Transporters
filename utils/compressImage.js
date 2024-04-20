import sharp from "sharp";
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";
import { v4 as uuIdv4 } from "uuid";

export async function convertToWebp(inputFilename, req) {
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
                        sequentialRead: false,
                    })
                    .toFile(outputFilename, async (err, info) => {
                        if (err) {
                            // console.log({ error: err }, 222222);
                            return { error: err };
                        } else {
                            await moveFile(
                                path.resolve() + "\\" + outputFilename,
                                path.resolve() +
                                    "\\" +
                                    outputDirectory +
                                    "\\" +
                                    outputFilename
                            );
                        }
                    });
                // console.log(ans);
                return outputFilename;
            })
        ).then((e) => {
            return e;
        });
        // console.log(aa);
    } catch (error) {
        // return { error };
        // console.log(1, error);
    }
}
async function moveFile(source, destination) {
    try {
        const fileExists = await fsExtra.pathExists(source);

        if (fileExists) {
            await fsExtra.move(source, destination, {
                overwrite: true,
                retryDelay: 500,
                retryAttempts: 3,
            });

            // console.log("تم نقل الملف بنجاح");
        }
    } catch (error) {
        // console.error("حدث خطأ أثناء نقل الملف", error);
    }
}

export async function removePic(filePath) {
    try {
        // open file as read and write
        const fileHandle = await fs.promises.open(filePath, "r+");
        // close file and try to unlink file from directory
        await fileHandle.close();

        await new Promise((resolve) => {
            setTimeout(resolve, 2000); // زمن انتظار لمدة ثانية واحدة (يمكن تعديله حسب الحاجة)
        });

        await fs.promises.unlink(filePath);
    } catch (error) {
        // console.log(error);
        if (error.code === "ENOENT") {
        }
    }
}
