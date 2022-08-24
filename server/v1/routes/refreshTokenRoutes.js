import express from "express";

/* import controllers */
import { refreshToken } from "../../controllers/refreshTokenController.js";

const router = express.Router();

router.get("/", refreshToken);

export default router;
