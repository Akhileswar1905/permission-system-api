import express from "express";
import mongoose from "mongoose";
import studentRouter from "./Routes/student.js";
import coordinarRouter from "./Routes/coordinator.js";
import hodRouter from "./Routes/hod.js";
import dotenv from "dotenv";
dotenv.config();

// Initializing express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());

// Routes
app.use("/student", studentRouter);
app.use("/faculty", coordinarRouter);
app.use("/hod", hodRouter);

// Homepage route
app.get("/", (req, res) => {
  res.send("Hello from API");
});

// Connection with MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
