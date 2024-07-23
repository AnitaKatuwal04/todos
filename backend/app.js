// app.js

const express = require("express");
const app = express();

const Todo = require("./models/todoModel");

const cors = require("cors");
app.use(cors());

app.use(express.json());

// Create a new todo
app.post("/api/v1/todos", async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const newTodo = await todo.save();

        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all todos
app.get("/api/v1/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single todo by ID
app.get("/api/v1/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an existing todo
app.patch("/api/v1/todos/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
app.delete("/api/v1/todos/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = app;
