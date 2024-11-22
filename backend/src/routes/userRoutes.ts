import express from "express";
import {
  createUser,
  getAll,
  login,
  register,
  getUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAll);
router.post("/users", createUser);
router.post("/login", login);
router.post("/register", register);
router.post("/getuser", getUser);

export default router;
