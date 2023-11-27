import Student from "../Models/studentModel.js";
import facultyModel from "../Models/coordinatorModel.js";
import hodModel from "../Models/hodModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
  // res.send("Hello from student API page");
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    // console.log(error);
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
      _id: existingStudent._id,
      id: uuidv4(),
      Timestamp: createdAt,
      subject: req.body.subject,
      permissionLetter: req.body.permissionLetter,
      documents: req.body.documents,
      status: "pending",
    };

    // If student exists, update permission record
    const { classAndSection } = req.body;
    const faculty = await facultyModel.findOne({ classAndSection });
    const dept = classAndSection.substring(0, classAndSection.length - 2);
    // console.log(dept);
    const hod = await hodModel.findOne({ dept: dept });
    // console.log(hod);
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
  } catch (error) {
    // console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    // console.log(error);
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
    const { classAndSection } = student;
    const faculty = await facultyModel.findOne({
      classAndSection: student.classAndSection,
    });
    const dept = faculty.dept;
    const hod = await hodModel.findOne({ dept: dept });

    console.log(hod);

    hod.permissionRecords = hod.permissionRecords.filter((record) => {
      return record.rollNo !== student.rollNo;
    });

    const data = {
      _id: student._id,
      id: id,
      name: student.name,
      rollNo: student.rollNo,
      classAndSection: student.classAndSection,
      subject: req.body.subject,
      permissionLetter: req.body.permissionLetter,
      documents: req.body.documents,
      status: "forwarded to hod",
      Timestamp: req.body.Timestamp,
    };
    console.log(data);
    req.body.status = "forwarded to hod";
    student.permissionRecords.push(data);
    await student.save();
    hod.permissionRecords.push(student);
    await hod.save();
    console.log(hod, student);
    faculty.permissionRecords = faculty.permissionRecords.filter((record) => {
      return record.rollNo !== student.rollNo;
    });
    faculty.permissionRecords.push(student);
    await faculty.save();
    res.status(200).json(student.permissionRecords);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const rejectedRequest = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(id, req.params.id);
    const student = await Student.findById(req.params.id);
    student.permissionRecords = student.permissionRecords.filter((record) => {
      return record.id !== id;
    });

    // console.log(student.permissionRecords);
    req.body.status = "rejected";
    student.permissionRecords.push(req.body);
    // console.log(student.permissionRecords);
    await student.save();

    const faculty = await facultyModel.findOne({
      classAndSection: student.classAndSection,
    });
    faculty.permissionRecords = faculty.permissionRecords.filter((record) => {
      return record.rollNo !== student.rollNo;
    });
    faculty.permissionRecords.push(student);
    await faculty.save();
    res.status(200).json({ data: student.permissionRecords });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const grantedRequest = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(id, req.params.id);
    const student = await Student.findById(req.params.id);
    student.permissionRecords = student.permissionRecords.filter((record) => {
      return record.id !== id;
    });

    // console.log(student.permissionRecords);
    req.body.status = "granted";
    student.permissionRecords.push(req.body);
    // console.log(student.permissionRecords);
    await student.save();

    const faculty = await facultyModel.findOne({
      classAndSection: student.classAndSection,
    });
    faculty.permissionRecords = faculty.permissionRecords.filter((record) => {
      return record.rollNo !== student.rollNo;
    });
    faculty.permissionRecords.push(student);
    await faculty.save();

    const dept = faculty.dept;
    console.log(dept);
    const hod = await hodModel.findOne({ dept: dept });

    console.log(faculty, hod);
    hod.permissionRecords = hod.permissionRecords.filter((record) => {
      return record.rollNo !== student.rollNo;
    });
    hod.permissionRecords.push(student);
    console.log(hod.permissionRecords);
    await hod.save();

    res.status(200).json({ data: student.permissionRecords });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    const student = await Student.findOne({ rollNo: rollNo });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const confirmPassword = bcrypt.compare(password, student.password);
    if (!confirmPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({
      status: "success",
      message: "Student logged in successfully",
      student,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { rollNo } = req.body;
    const existingStudent = await Student.findOne({ rollNo: rollNo });
    if (existingStudent) {
      return res.status(409).json({ error: "Student already exists" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const student = await Student.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};
