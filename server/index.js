// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a mongoose model for your data
const SuperHero = mongoose.model("SuperHero", {
  name: String,
  email: String,
  contact: String,
});

// Middleware to parse JSON requests
app.use(express.json());
// app.use(
//   cors({
//     origin: "https://wash-crud-frontend.vercel.app",
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );
app.use(cors());

// Create a new SuperHero
app.post("/createsuperheroes", async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const superHero = new SuperHero({ name, email, contact });
    await superHero.save();
    res
      .status(201)
      .json({ message: "SuperHero created successfully", data: superHero });
  } catch (error) {
    console.error("Error creating SuperHero:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all SuperHeroes

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/getallsuperheroes", async (req, res) => {
  try {
    const superHeroes = await SuperHero.find();
    res.json({ data: superHeroes });
  } catch (error) {
    console.error("Error getting SuperHeroes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a specific SuperHero by ID
app.get("/getsinglesuperheroe/:id", async (req, res) => {
  try {
    const superHero = await SuperHero.findById(req.params.id);
    if (!superHero) {
      return res.status(404).json({ message: "SuperHero not found" });
    }
    res.json({ data: superHero });
  } catch (error) {
    console.error("Error getting SuperHero by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a SuperHero by ID
app.put("/updatesuperheroe/:id", async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const superHero = await SuperHero.findByIdAndUpdate(
      req.params.id,
      { name, email, contact },
      { new: true }
    );
    if (!superHero) {
      return res.status(404).json({ message: "SuperHero not found" });
    }
    res.json({ message: "SuperHero updated successfully", data: superHero });
  } catch (error) {
    console.error("Error updating SuperHero:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a SuperHero by ID
app.delete("/deletesuperheroe/:id", async (req, res) => {
  try {
    const superHero = await SuperHero.findByIdAndDelete(req.params.id);
    if (!superHero) {
      return res.status(404).json({ message: "SuperHero not found" });
    }
    res.json({ message: "SuperHero deleted successfully", data: superHero });
  } catch (error) {
    console.error("Error deleting SuperHero:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
