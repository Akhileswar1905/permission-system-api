import mongoose from "mongoose";
const facultySchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    rollNo: {
      type: "string",
      required: true,
    },
    subject: {
      type: "string",
      required: false,
      // default: 0,
    },
    password: {
      type: "string",
      required: false,
    },
    permissionLetter: {
      type: "string",
      required: false,
    },
    documents: {
      type: "string",
      required: false,
    },
    classAndSection: {
      type: "string",
      required: true,
    },
    dept: {
      type: "string",
      required: true,
    },
    permissionRecords: {
      type: "array",
    },
    // recentRequest: {},
  },
  {
    timestamps: true,
  }
);

const faculty = mongoose.model("faculty", facultySchema);

export default faculty;
