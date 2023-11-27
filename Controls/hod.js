import hodModel from "../Models/hodModel.js";
import Student from "../Models/studentModel.js";

export const getAllHODs = async (req, res) => {
  try {
    const hod = await hodModel.find({});
    res.status(200).json(hod);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getHOD = async (req, res) => {
  try {
    const hod = await hodModel.findById(req.params.id);
    res.status(200).json(hod);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createHOD = async (req, res) => {
  try {
    const hod = await hodModel.create(req.body);

    const { name } = req.body;
    console.log(name);

    res.status(200).json(hod);
  } catch (error) {
    console.log(error);
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

export const rejectedRequest = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(req.params.id);
    student.permissionRecords = student.permissionRecords.filter((record) => {
      return record.id !== id;
    });

    req.body.status === "rejected";
    await student.save();

    student.permissionRecords.push(req.body);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteHOD = async (req, res) => {
  try {
    const hod = await hodModel.findByIdAndDelete(req.params.id);
    res.status(200).json(hod);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    const hod = await hodModel.findOne({ rollNo: rollNo });
    if (!hod) {
      return res.status(404).json({ error: "hodModel not found" });
    }
    if (hod.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({
      status: "success",
      message: "hodModel logged in successfully",
      hod,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { rollNo } = req.body;
    const existinghodModel = await hodModel.findOne({
      rollNo: rollNo,
    });
    if (existinghodModel) {
      return res.status(409).json({ error: "hodModel already exists" });
    }
    const hod = await hodModel.create(req.body);

    res.status(200).json({
      status: "success",
      message: "hodModel created successfully",
      hod,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};
