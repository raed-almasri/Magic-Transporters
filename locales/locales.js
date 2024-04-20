import i18n from "i18n";
let myLanguages = ["ar", "en", "fr", "ja", "ru"];
export let localesLanguages = (app) => {
	i18n.configure({
		locales: ["en", "ar", "fr", "ja", "ru"],
		directory: "./locales",
		defaultLocale: "en",
		objectNotation: true,
	});

	app.use(i18n.init);

	app.use((req, res, next) => {
		let lang = req.headers["accept-language"] || req.headers["lang"];

		if (!myLanguages.includes(lang)) lang = "en";

		req.setLocale(lang);
		req.getLocalLanguage = (key) => req.__(key);
		next();
	});
};
