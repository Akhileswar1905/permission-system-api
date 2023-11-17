import express from "express";
import Student from "../Models/studentModel.js";
import {
  getAllStudents,
  getStudent,
  createStudent,
  grantedRequest,
  rejectedRequest,
  forwardToHOD,
  deleteStudent,
} from "../Controls/student.js";
const router = express.Router();

router.get("/", getAllStudents);

router.get("/:id", getStudent);

router.post("/", createStudent);

router.post("/granted/:id", grantedRequest);

router.post("/rejected/:id", rejectedRequest);

router.post("/fowarded/:id", forwardToHOD);

router.delete("/:id", deleteStudent);

export default router;
