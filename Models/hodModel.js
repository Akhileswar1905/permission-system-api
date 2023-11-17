import mongoose from "mongoose";
import coordinator from "./coordinatorModel.js";

const hodSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  rollNo: {
    type: "string",
    required: true,
  },
  dept: {
    type: "string",
    required: true,
  },
  permissionRecords: {
    type: "array",
    required: false,
  },
  coordinators: {
    type: "array",
  },
});

const hod = mongoose.model("hod", hodSchema);

export default hod;
