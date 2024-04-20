import express from "express";
const router = express.Router();
import control from "../../controllers/admin/users.controller.js";
import { schema } from "../../validation/schema/admin/user.schema.js";
import { auth, type, validate, execute } from "../../config/header_routers.js";
import { authorization } from "../../middleware/authorization.js";
import { enumRoles } from "../../utils/enums.js";

router.post(
	"/",
	auth, 
	authorization(enumRoles.admin),
	validate(schema.body, type.body),
	validate(schema.empty, type.query),
	execute(control.create)
);

router.put(
	"/:id",
	auth,
	authorization(enumRoles.admin),
	validate(schema.params, type.params),
	validate(schema.body, type.body),
	validate(schema.empty, type.query),
	execute(control.update)
);
router.delete(
	"/:id",
	auth,
	authorization(enumRoles.admin),
	validate(schema.params, type.params),
	validate(schema.empty, type.query),
	execute(control.remove)
);

router.get(
	"/mover-for-user",
	auth,
	authorization(enumRoles.admin), 
	validate(schema.userId, type.query),
	execute(control.fetchAllMoverForUser)
);
router.get(
	"/",
	auth,
	authorization(enumRoles.admin), 
	validate(schema.empty, type.query),
	execute(control.fetchAll)
);
export default router;
