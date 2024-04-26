// loadJson.ts
import fs from "fs";
import path from "path";

export function loadJson(filePath: string): any {
    const fullPath = path.resolve(process.cwd(), filePath);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(fileContent);
}
