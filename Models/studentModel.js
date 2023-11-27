import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    rollNo: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: false,
    },
    subject: {
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
    permissionRecords: {
      type: "array",
    },
    status: {
      type: "string",
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("Student", studentSchema);

export default student;
