import express, { Request, Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import logRegisterConfig from "./config/log.js";
import corsConfig from "./config/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { limit } from "./middleware/limit.js";
// // Protection
import expectCt from "expect-ct";
import compression from "compression";
import helmet from "./config/helmet.js";

import router from "./routers/index.js";

import { localesLanguages } from "./locales/locales.js";
import dotenv from "dotenv";
dotenv.config({ path: `./.env` });
let app: Express = express();

// Swagger API documentation
let swaggerJsdoc: any = loadJson("./swagger-output.json");

import swaggerUi from "swagger-ui-express";
import { loadJson } from "./utils/jsonTools.js";
if (process.env.NODE_ENV == "developer") {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerJsdoc, {
            explorer: true,
            swaggerOptions: {
                theme: "dark", // Ensure this is set correctly
                requestInterceptor: (request: Request) => {
                    request.headers["accept-language"] = "en";
                    return request;
                },
            },
        })
    );
}

app.use(limit);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "20kb" }));

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

corsConfig(app);

helmet(app);

logRegisterConfig(app);

app.use(expectCt({ enforce: true, maxAge: 123, reportUri: process.env.lINK }));
app.use(compression());

// I18N for multi language
localesLanguages(app);
app.use(router);

app.use(errorHandler);
export default app;
