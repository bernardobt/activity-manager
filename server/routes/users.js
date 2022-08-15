import express from "express";

/* import controllers */
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

/* routing of the controllers */
router.get("/", getUsers);
router.post("/", addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
