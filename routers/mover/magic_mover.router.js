import express from "express";
const router = express.Router();
import control from "../../controllers/mover/magic_mover.controller.js"; 
import { auth, type, validate, execute } from "../../config/header_routers.js";
import { authorization } from "../../middleware/authorization.js";
import { enumRoles } from "../../utils/enums.js";

router.get(
	"/",
	auth,
	authorization(enumRoles.mover), 
	execute(control.fetchAllMyMover)
);

export default router;
