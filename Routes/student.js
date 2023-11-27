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
  signUp,
  signIn,
} from "../Controls/student.js";
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", signIn);

router.get("/", getAllStudents);

router.get("/:id", getStudent);

router.post("/", createStudent);

router.put("/granted/:id", grantedRequest);

router.put("/rejected/:id", rejectedRequest);

router.put("/fowarded/:id", forwardToHOD);

router.delete("/:id", deleteStudent);

export default router;
