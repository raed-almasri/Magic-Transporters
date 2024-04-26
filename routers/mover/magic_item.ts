import express, { Router } from "express";
const router: Router = express.Router();
import control from "../../controllers/mover/mover_item.controller.js";
import { schema } from "../../validation/schema/mover/magic_item.schema.js";
import { auth, type, validate, execute } from "../../config/header_routers.js";
import { authorization } from "../../middleware/authorization.js";
import { enumRoles } from "../../utils/enums.js";

router.post(
    "/",
    auth,
    authorization(enumRoles.mover),
    validate(schema.body, type.body),
    validate(schema.empty, type.query),
    execute(control.create)
);

router.delete(
    "/:id",
    auth,
    authorization(enumRoles.mover),
    validate(schema.params, type.params),
    execute(control.remove)
);

export default router;
