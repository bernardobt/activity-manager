import express from "express";

/* import controllers */
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../../controllers/userController.js";

const router = express.Router();

/* routing of the controllers */

// goes to controller. controller goes to the service.
// service goes to dal.
// dal interects with db
router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
