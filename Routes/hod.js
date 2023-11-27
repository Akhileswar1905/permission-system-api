import express from "express";
import {
  getAllHODs,
  createHOD,
  deleteHOD,
  getHOD,
  grantedRequest,
  rejectedRequest,
  signIn,
  signUp,
} from "../Controls/hod.js";
const router = express.Router();

router.get("/", getAllHODs);

router.get("/:id", getHOD);

router.post("/", createHOD);

router.post("/granted/:id", grantedRequest);

router.post("/rejected/:id", rejectedRequest);

router.delete("/:id", deleteHOD);

router.post("/login", signIn);

router.post("/signup", signUp);

export default router;
