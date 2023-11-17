import coordinatorModel from "../Models/coordinatorModel.js";
// import StudentRequestModel from "../Models/studentModel.js";
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
    hod.coordinators.push(faculty);
    await hod.save();
    const { name } = req.body;
    console.log(name);

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
