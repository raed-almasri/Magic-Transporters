import express, { Router } from "express";
const router: Router = express.Router();
import control from "../controllers/auth.controllers.js";
import { schema } from "../validation/schema/auth.schema.js";
import { auth, validate, type, execute } from "../config/header_routers.js";
import { limitLogin } from "../middleware/limit.js";

router.post(
    "/",
    limitLogin,
    validate(schema.logIn, type.body),
    execute(control.login)
);
router.get("/", auth, execute(control.logout));
router.put("/refresh", execute(control.refreshToken));
export default router;
