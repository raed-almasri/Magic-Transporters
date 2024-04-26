import express, { Router } from "express";
let router: Router = express.Router();
import MagicMoverApi from "./magic_mover.router.js";
import UserApi from "./user.router.js";

router.use("/magic-mover", MagicMoverApi);
router.use("/users", UserApi);
export default router;
