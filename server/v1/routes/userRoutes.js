import express from "express";

/* import controllers */
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  signInUser,
} from "../../controllers/userController.js";

// import { signInUser } from "../../controllers/authController.js";

import verifyJWT from "../../middleware/verifyJWT.js";

const router = express.Router();

/* routing of the controllers */

// goes to controller. controller goes to the service.
// service goes to dal.
// dal interects with db
router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", verifyJWT, getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/:id/login", signInUser);

export default router;
