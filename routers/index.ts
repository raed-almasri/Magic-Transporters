import express, { Router } from "express";
const router: Router = express.Router();
import authApi from "./auth.router.js";
import adminApi from "./admin/index.js";
import moverApi from "./mover/index.js";
import { StatusCodes } from "http-status-codes";

router.use("/auth", authApi);
router.use("/admin", adminApi);
router.use("/mover", moverApi);

router.use("*", (req, res) => {
    return res
        .status(StatusCodes.NOT_FOUND)
        .send({ success: false, error: "Error 404 not found page" });
});
export default router;
