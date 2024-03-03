// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./modules/user");
const TodoModel = require("./modules/todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myapp");

// Define routes
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not create user.' });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'success' });
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not log in.' });
  }
});

app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch To-Do tasks.' });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await TodoModel.findByIdAndUpdate(id, { task: req.body.task }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Could not update To-Do task.' });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TodoModel.findByIdAndDelete(id);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'Could not delete To-Do task.' });
  }
});

app.post("/add", async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = await TodoModel.create({ task });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Could not add new To-Do task.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
