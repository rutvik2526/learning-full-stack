const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const tasks = require("./tasks");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

function findTaskById(id) {
    const taskId = Number(id);

    return tasks.find(function (task) {
        return task.id === taskId;
    });
}

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
    const task = findTaskById(req.params.id);

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

app.patch("/api/tasks/:id", function (req, res) {
    const task = findTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const { title, projectId, completed } = req.body;

    const errors = {};

    if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            errors.title = "Title must be a non-blank string.";
        }
    }

    if (projectId !== undefined) {
        if (!Number.isInteger(projectId) || projectId <= 0) {
            errors.projectId = "Project ID must be a positive integer.";
        }
    }

    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            errors.completed = "Completed must be true or false.";
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            error: "Validation failed",
            fields: errors
        });
    }

    if (title !== undefined) {
        task.title = title.trim();
    }

    if (projectId !== undefined) {
        task.projectId = projectId;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    res.json(task);
});

app.delete("/api/tasks/:id", function (req, res) {
    const taskIndex = tasks.findIndex(function (task) {
        return task.id === Number(req.params.id);
    });

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json({
        message: "Task deleted successfully",
        task: deletedTask
    });
});

/*
 * Error-handling middleware
 * Keep this after all routes.
 */
app.use(function (err, req, res, next) {
    console.error(err);

    res.status(500).json({
        error: "Internal server error"
    });
});

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});