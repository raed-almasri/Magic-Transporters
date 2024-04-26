import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";

export let moveFile = (file: string, dir2: string) => {
    var f = path.basename(file);
    var dest = path.resolve(dir2, f);

    fs.rename(file, dest, (err: any) => {
        if (err) throw Error(err);
    });
    return dest;
};

export let removePic = async (myPath: string) => {
    try {
        if (await fsExtra.pathExists(myPath)) {
            await fsExtra.remove(myPath);
            // console.log("تم حذف الملف بنجاح");
        }
    } catch (error) {
        // console.log({ error });
    }
};
