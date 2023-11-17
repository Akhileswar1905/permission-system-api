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
    },
    subject: {
      type: "string",
      required: true,
      default: 0,
    },
    permissionLetter: {
      type: "string",
      required: true,
    },
    documents: {
      type: "string",
      required: true,
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
