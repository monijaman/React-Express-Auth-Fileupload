import express from "express";
import {
  createUser,
  getAll,
  login,
  register,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAll);
router.post("/users", createUser);
router.post("/login", login);
router.post("/register", register);

export default router;
