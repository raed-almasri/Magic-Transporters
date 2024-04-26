import express, { Router } from "express";
const router: Router = express.Router();
import control from "../../controllers/mover/trip.controller.js";
import { schema } from "../../validation/schema/mover/trip.schema.js";
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

router.put(
    "/:id",
    auth,
    authorization(enumRoles.mover),
    validate(schema.body, type.body),
    validate(schema.params, type.params),
    validate(schema.empty, type.query),
    execute(control.update)
);
router.patch(
    "/change-state",
    auth,
    authorization(enumRoles.mover),
    validate(schema.queryValidation, type.query),
    execute(control.changeState)
);
router.delete(
    "/:id",
    auth,
    authorization(enumRoles.mover),
    validate(schema.params, type.params),
    execute(control.remove)
);
router.get(
    "/",
    auth,
    authorization(enumRoles.mover),
    validate(schema.empty, type.query),
    execute(control.fetchAll)
);

export default router;
