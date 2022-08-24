import express from "express";

/* import controllers */
import { logoutUser } from "../../controllers/logoutController.js";
const router = express.Router();

router.get("/", logoutUser);

export default router;
