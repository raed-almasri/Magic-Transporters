import { Request, Response, NextFunction, Express } from "express";
import i18n from "i18n";
let myLanguages = ["ar", "en", "fr", "ja", "ru"];
export let localesLanguages = (app: Express) => {
    i18n.configure({
        locales: ["en", "ar", "fr", "ja", "ru"],
        directory: "./locales",
        defaultLocale: "en",
        objectNotation: true,
    });

    app.use(i18n.init);

    app.use((req: Request, res: Response, next: NextFunction) => {
        let lang: string = Array.isArray(req.headers["accept-language"])
            ? req.headers["accept-language"][0]
            : req.headers["accept-language"];

        if (!myLanguages.includes(lang)) lang = "en";

        req.setLocale(lang);
        req.getLocalLanguage = (key: string) => req.__(key);
        next();
    });
};
