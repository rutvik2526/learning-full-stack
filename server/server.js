const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const tasks = require("./tasks");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/health", function (req, res) {
    res.json({
        status: "ok",
        message: "Server is running"
    });
});

app.get("/api/tasks", function (req, res) {
    res.json(tasks);
});

app.get("/api/tasks/:id", function (req, res) {
    const taskId = Number(req.params.id);

    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});

app.post("/api/tasks", function (req, res) {
    const { title, projectId } = req.body;

    const errors = {};

    if (typeof title !== "string" || title.trim() === "") {
        errors.title = "Title is required and cannot be blank.";
    }

    if (
        projectId === undefined ||
        projectId === null ||
        !Number.isInteger(projectId) ||
        projectId <= 0
    ) {
        errors.projectId = "Project ID must be a positive integer.";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            error: "Validation failed",
            fields: errors
        });
    }

    const newTask = {
        id: tasks.length > 0
            ? Math.max(...tasks.map(function (task) {
                return task.id;
            })) + 1
            : 1,
        title: title.trim(),
        projectId: projectId,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});