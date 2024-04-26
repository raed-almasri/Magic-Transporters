import express, { Router } from "express";
const router: Router = express.Router();
import control from "../../controllers/admin/magic_mover.admin.controller.js";
import { schema } from "../../validation/schema/admin/magic_mover.schema.js";
import { auth, type, validate, execute } from "../../config/header_routers.js";
import { authorization } from "../../middleware/authorization.js";
import { enumRoles } from "../../utils/enums.js";

router.post(
    "/",
    auth,
    authorization(enumRoles.admin),
    validate(schema.body, type.body),
    validate(schema.queryValidationUser, type.query),
    execute(control.create)
);

router.put(
    "/",
    auth,
    authorization(enumRoles.admin),
    validate(schema.body, type.body),
    validate(schema.queryValidation, type.query),
    execute(control.update)
);
router.delete(
    "/",
    auth,
    authorization(enumRoles.admin),
    validate(schema.queryValidation, type.query),
    execute(control.remove)
);

export default router;
