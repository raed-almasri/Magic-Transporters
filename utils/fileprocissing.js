import { join } from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { promises as fsPromises } from "fs";
import fs from "fs";
import sharp from "sharp";
import { promisify } from "util";
import { StatusCodes } from "http-status-codes";
export var permitedExtensions = ["pdf"];
async function isImage(file) {
    try {
        await sharp(file).metadata();
        return true;
    } catch (error) {
        return false;
    }
}

async function deleteHiddenData(file, ext) {
    try {
        return await sharp(file)
            .toFormat(ext, {
                quality: 100,
            })
            .toBuffer();
    } catch (error) {
        throw Error(error);
    }
}

let fileProcessing = {
    deleteFile: async (file_name) => {
        try {
            let filePath = `images`;
            const imageName = file_name.split(".")[0];
            await fsPromises.unlink(join(filePath, file_name));

            await fsPromises.unlink(join(filePath, `${imageName}_comp.webp`));
        } catch (error) {
            // throw Error(error);
        }
    },

    fileSave: async (file) => {
        try {
            const ImageSize = 500000000;
            let files = [];

            // !  Validation Files
            await Promise.all(
                file.map(async (item) => {
                    const fileType = item.mimetype.split("/")[0].toLowerCase();
                    const fileExtension = item.filename
                        .split(".")[1]
                        .toLowerCase();

                    const buffer = Buffer.from(
                        await promisify(fs.readFile)(item.path)
                    );

                    // Size
                    if (item.size > ImageSize)
                        throw new Error(
                            "some file is too big .",
                            StatusCodes.BAD_REQUEST
                        );

                    if (fileType !== "image" || fileExtension == "webp")
                        throw new Error("you should send just  image ");

                    if (!isImage(buffer)) {
                        throw new Error(
                            "الصورة بها قيمة غير صالحة.",
                            StatusCodes.BAD_REQUEST
                        );
                    }
                })
            );
            // saving
            await Promise.all(
                file.map(async (item) => {
                    const fileType = item.mimetype.split("/")[0].toLowerCase();
                    const fileExtension = item.filename
                        .split(".")[1]
                        .toLowerCase();
                    const buffer = Buffer.from(
                        await promisify(fs.readFile)(item.path)
                    );

                    let uploads = "images";
                    const outputFilename = `${uuidv4()}.${fileExtension}`;
                    const path = join(uploads, outputFilename);

                    if (fileType === "image") {
                        const cleanedBuffer = await deleteHiddenData(
                            buffer,
                            fileExtension
                        );
                        await writeFile(path, cleanedBuffer);
                        const compressedImage = await sharp(buffer)
                            .toFormat("webp", { quality: 100 })
                            .toBuffer();
                        const imagename = outputFilename.split(".")[0];
                        const outComImgName = `${imagename}_comp.webp`;
                        const pathCom = join(uploads, outComImgName);
                        await writeFile(pathCom, compressedImage);
                        await fsPromises.unlink(file[0].path);
                    } else {
                        await writeFile(path, buffer);
                    }

                    files.push({
                        file_name: outputFilename,
                        originalname: item.originalname,
                    });
                })
            );
            return files;
        } catch (error) {
            throw new Error(error, StatusCodes.BAD_REQUEST);
        }
    },
};

export default fileProcessing;
