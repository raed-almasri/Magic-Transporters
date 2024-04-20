 
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";
 
export let moveFile = (file, dir2) => {
    var f = path.basename(file);
    var dest = path.resolve(dir2, f);

    fs.rename(file, dest, (err) => {
        if (err) throw Error(err);
    });
    return dest;
};

export let removePic = async (myPath) => {
    try {
        if (await fsExtra.pathExists(myPath)) {
            await fsExtra.remove(myPath);
            // console.log("تم حذف الملف بنجاح");
        }
    } catch (error) {
        // console.log({ error });
    }
};
  
 