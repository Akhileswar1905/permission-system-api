import express from "express";
import {
  createCoordinator,
  deleteCoordinator,
  getAllCoordinators,
  getCoordinator,
} from "../Controls/coordinator.js";
const router = express.Router();

router.get("/", getAllCoordinators);

router.get("/:id", getCoordinator);

router.post("/", createCoordinator);

router.delete("/:id", deleteCoordinator);

export default router;
