import express from "express";
let router = express.Router(); 
import MagicMoverApi from "./magic_mover.router.js";
import UserApi from "./user.router.js";
  
router.use("/magic-mover", MagicMoverApi); 
router.use("/users", UserApi); 
export default router;
