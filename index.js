import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

// Required for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve UI files
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// Insert Student API
app.post("/students", async (req, res) => {
  try {
    const { studentId, name, course } = req.body;

    if (!studentId || !name || !course) {
      return res.status(400).json({ error: "All fields required" });
    }

    await db.collection("students").doc(studentId).set({
      name,
      course,
      createdAt: new Date()
    });

    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
