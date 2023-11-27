import coordinatorModel from "../Models/coordinatorModel.js";
// import coordinatorModelRequestModel from "../Models/facultyModel.js";
import hodModel from "../Models/hodModel.js";

export const getAllCoordinators = async (req, res) => {
  try {
    const faculty = await coordinatorModel.find({});
    res.status(200).json(faculty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCoordinator = async (req, res) => {
  try {
    const faculty = await coordinatorModel.findById(req.params.id);
    res.status(200).json(faculty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createCoordinator = async (req, res) => {
  try {
    const faculty = await coordinatorModel.create(req.body);
    const { dept } = req.body;
    const hod = await hodModel.findOne({ dept: dept });
    // console.log(hod);

    res.status(200).json(faculty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteCoordinator = async (req, res) => {
  try {
    const faculty = await coordinatorModel.findByIdAndDelete(req.params.id);
    res.status(200).json(faculty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    const faculty = await coordinatorModel.findOne({ rollNo: rollNo });
    if (!faculty) {
      return res.status(404).json({ error: "coordinatorModel not found" });
    }
    if (faculty.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({
      status: "success",
      message: "coordinatorModel logged in successfully",
      faculty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { rollNo } = req.body;
    const existingcoordinatorModel = await coordinatorModel.findOne({
      rollNo: rollNo,
    });
    if (existingcoordinatorModel) {
      return res.status(409).json({ error: "coordinatorModel already exists" });
    }
    const faculty = await coordinatorModel.create(req.body);
    const classAndSection = req.body.classAndSection;
    const dept = req.body.dept;
    console.log(dept);
    const hod = await hodModel.findOne({ dept: dept });
    console.log(hod);
    hod.coordinators.push(faculty);
    await hod.save();
    const { name } = req.body;
    console.log(name);
    res.status(200).json({
      status: "success",
      message: "coordinatorModel created successfully",
      faculty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};
