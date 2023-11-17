import Student from "../Models/studentModel.js";
import facultyModel from "../Models/coordinatorModel.js";
import hodModel from "../Models/hodModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
  // res.send("Hello from student API page");
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createStudent = async (req, res) => {
  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({ rollNo: req.body.rollNo });

    // Current Timestamp
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const createdAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // New Permission Record
    const newPermissionRecord = {
      id: uuidv4(),
      Timestamp: createdAt,
      subject: req.body.subject,
      permissionLetter: req.body.permissionLetter,
      documents: req.body.documents,
      status: "pending",
    };

    // If student exists, update permission record
    if (existingStudent) {
      const { classAndSection } = req.body;
      const faculty = await facultyModel.findOne({ classAndSection });
      const dept = classAndSection.substring(0, classAndSection.length - 2);
      console.log(dept);
      const hod = await hodModel.findOne({ dept: dept });
      console.log(hod);
      if (!faculty) {
        return res.status(404).json({ error: "Faculty not found" });
      }

      existingStudent.permissionRecords.push(newPermissionRecord);
      await existingStudent.save();

      faculty.permissionRecords = faculty.permissionRecords.filter((record) => {
        return record.rollNo !== existingStudent.rollNo;
      });

      faculty.permissionRecords.push(existingStudent);
      await faculty.save();

      res.status(200).json({
        status: "success",
        message: "Student's permission record updated",
        student: existingStudent,
      });
    } else {
      // Creating a new student permission record
      const student = await Student.create(req.body);
      const { classAndSection } = req.body;
      const faculty = await facultyModel.findOne({ classAndSection });
      const dept = classAndSection.substring(0, classAndSection.length - 2);
      console.log(dept);
      const hod = await hodModel.findOne({ dept: dept });
      console.log(hod);
      if (!faculty) {
        return res.status(404).json({ error: "Faculty not found" });
      }
      student.permissionRecords.push(newPermissionRecord);
      await student.save();
      faculty.permissionRecords.push(student);
      await faculty.save();

      res.status(200).json({
        status: "success",
        message: "New student created and associated with faculty",
        student,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const forwardToHOD = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(req.params.id);
    student.permissionRecords = student.permissionRecords.filter((record) => {
      return record.id !== id;
    });
    const { classAndSection } = req.body;
    const dept = classAndSection.substring(0, classAndSection.length - 2);
    const hod = await hodModel.findOne({ dept: dept });
    console.log(hod);
    hod.permissionRecords.push({
      id: id,
      name: req.body.name,
      rollNo: req.body.rollNo,
      classAndSection: req.body.classAndSection,
      subject: req.body.subject,
      permissionLetter: req.body.permissionLetter,
      documents: req.body.documents,
      status: "forwarded to hod",
    });
    await hod.save();
    console.log(dept);
    req.body.status === "forwarded to hod";
    student.permissionRecords.push(req.body);
    await student.save();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const rejectedRequest = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(req.params.id);
    student.permissionRecords = student.permissionRecords.filter((record) => {
      return record.id !== id;
    });

    req.body.status === "rejected";

    student.permissionRecords.push(req.body);
    await student.save();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const grantedRequest = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(req.params.id);
    student.permissionRecords = student.permissionRecords.filter((record) => {
      return record.id !== id;
    });

    req.body.status === "granted";
    student.permissionRecords.push(req.body);
    await student.save();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
