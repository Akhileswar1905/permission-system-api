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
