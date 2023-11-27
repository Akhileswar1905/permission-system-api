import express from "express";
import {
  createCoordinator,
  deleteCoordinator,
  getAllCoordinators,
  getCoordinator,
  signIn,
  signUp,
} from "../Controls/coordinator.js";
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", signIn);

router.get("/", getAllCoordinators);

router.get("/:id", getCoordinator);

router.post("/", createCoordinator);

router.delete("/:id", deleteCoordinator);

export default router;
