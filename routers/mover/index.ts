import express, { Router } from "express";
let router: Router = express.Router();
import MagicMoverApi from "./magic_mover.router.js";
import UserApi from "./trip.router.js";
import MagicItems from "./magic_item.js";

router.use("/", MagicMoverApi);
router.use("/trip", UserApi);
router.use("/magic-item", MagicItems);
export default router;
