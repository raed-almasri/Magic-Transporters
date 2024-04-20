import express from "express";
import bodyParser from "body-parser";
import expressSanitizer from "express-sanitizer";
import cookieParser from "cookie-parser";

import logRegisterConfig from "./config/log.js";
import corsConfig from "./config/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { limit } from "./middleware/limit.js";
// Protection
import xss from "xss-clean";
import expectCt from "expect-ct";
import compression from "compression";
import helmet from "./config/helmet.js";
import sessionConfig from "./config/sessionConfig.js";
// import csurfProtection from "./config/csurf.js";

import router from "./routers/router.js";

import { localesLanguages } from "./locales/locales.js";
import dotenv from "dotenv";
dotenv.config({ path: `./.env` });
let app = express();

// Swagger API documentation
import swaggerJsdoc from "./swagger-output.json" assert { type: "json" };

import swaggerUi from "swagger-ui-express";
if (process.env.NODE_ENV == "developer") {
	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(swaggerJsdoc, {
			explorer: true,
			swaggerOptions: {
				theme: "dark", // Ensure this is set correctly
				requestInterceptor: (request) => {
					request.headers["accept-language"] = "en";
					return request;
				},
			},
		})
	);
}

app.use(limit);
dotenv.config({ path: `.env` });

app.use(cookieParser());
app.use(bodyParser.json({ limit: "20kb" }));

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSanitizer());

corsConfig(app);

helmet(app);

logRegisterConfig(app);
app.use(sessionConfig);

app.use(xss());
app.use(expectCt({ enforce: true, maxAge: 123, reportUri: process.env.lINK }));
app.use(compression());

// I18N for multi language
localesLanguages(app);
app.use(router);

app.use(errorHandler);
export default app;
