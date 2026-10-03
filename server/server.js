require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    const startTime = Date.now();

    res.on("finish", function () {
        const duration = Date.now() - startTime;

        console.log(
            `${req.method} ${req.path} ${res.statusCode} ${duration}ms`
        );
    });

    next();
});


/* =========================
   HEALTH CHECK
   ========================= */

app.get("/health", function (req, res) {
    res.json({
        status: "ok"
    });
});


/* =========================
   GET ALL TASKS
   ========================= */

app.get("/api/tasks", async function (req, res) {
    try {
        const result = await pool.query(`
            SELECT
                tasks.id,
                tasks.title,
                tasks.project_id AS "projectId",
                tasks.status,
                projects.name AS "projectName",
                tasks.created_at AS "createdAt",
                tasks.updated_at AS "updatedAt"
            FROM tasks
            JOIN projects
                ON tasks.project_id = projects.id
            ORDER BY tasks.id;
        `);

        const tasks = result.rows.map(function (task) {
            return {
                id: task.id,
                title: task.title,
                projectId: task.projectId,
                projectName: task.projectName,
                status: task.status,
                completed: task.status === "completed",
                createdAt: task.createdAt,
                updatedAt: task.updatedAt
            };
        });

        res.json(tasks);
    } catch (error) {
        console.error("Failed to load tasks from database.");

        res.status(500).json({
            error: "Unable to load tasks from database."
        });
    }
});


/* =========================
   GET ONE TASK
   ========================= */

app.get("/api/tasks/:id", async function (req, res) {
    try {
        const taskId = Number(req.params.id);

        if (!Number.isInteger(taskId)) {
            return res.status(400).json({
                error: "Task id must be a number."
            });
        }

        const result = await pool.query(
            `
            SELECT
                tasks.id,
                tasks.title,
                tasks.project_id AS "projectId",
                tasks.status,
                projects.name AS "projectName",
                tasks.created_at AS "createdAt",
                tasks.updated_at AS "updatedAt"
            FROM tasks
            JOIN projects
                ON tasks.project_id = projects.id
            WHERE tasks.id = $1;
            `,
            [taskId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found."
            });
        }

        const task = result.rows[0];

        res.json({
            id: task.id,
            title: task.title,
            projectId: task.projectId,
            projectName: task.projectName,
            status: task.status,
            completed: task.status === "completed",
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        });
    } catch (error) {
        console.error("Failed to load task from database.");

        res.status(500).json({
            error: "Unable to load task from database."
        });
    }
});


/* =========================
   CREATE TASK
   ========================= */

app.post("/api/tasks", async function (req, res) {
    try {
        const title = req.body.title;
        const projectId = Number(req.body.projectId);

        /* Validate title */
        if (
            typeof title !== "string" ||
            title.trim() === ""
        ) {
            return res.status(400).json({
                error: "Task title is required."
            });
        }

        /* Validate projectId */
        if (!Number.isInteger(projectId)) {
            return res.status(400).json({
                error: "projectId must be a number."
            });
        }

        /* Check that the project exists */
        const projectResult = await pool.query(
            `
            SELECT
                id,
                name
            FROM projects
            WHERE id = $1;
            `,
            [projectId]
        );

        if (projectResult.rows.length === 0) {
            return res.status(400).json({
                error: "Project not found."
            });
        }

        /* Insert the task into PostgreSQL */
        const result = await pool.query(
            `
            INSERT INTO tasks (
                id,
                project_id,
                title,
                status
            )
            VALUES (
                COALESCE(
                    (SELECT MAX(id) + 1 FROM tasks),
                    1
                ),
                $1,
                $2,
                'pending'
            )
            RETURNING
                id,
                project_id AS "projectId",
                title,
                status,
                created_at AS "createdAt",
                updated_at AS "updatedAt";
            `,
            [
                projectId,
                title.trim()
            ]
        );

        const task = result.rows[0];

        res.status(201).json({
            id: task.id,
            title: task.title,
            projectId: task.projectId,
            projectName: projectResult.rows[0].name,
            status: task.status,
            completed: task.status === "completed",
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        });
    } catch (error) {
        console.error("Failed to create task.");

        res.status(500).json({
            error: "Unable to create task."
        });
    }
});


/* =========================
   UPDATE TASK
   ========================= */

app.patch("/api/tasks/:id", async function (req, res) {
    try {
        const taskId = Number(req.params.id);

        if (!Number.isInteger(taskId)) {
            return res.status(400).json({
                error: "Task id must be a number."
            });
        }

        const title = req.body.title;
        const projectId = Number(req.body.projectId);
        const completed = req.body.completed;

        if (
            typeof title !== "string" ||
            title.trim() === ""
        ) {
            return res.status(400).json({
                error: "Task title is required."
            });
        }

        if (!Number.isInteger(projectId)) {
            return res.status(400).json({
                error: "projectId must be a number."
            });
        }

        if (typeof completed !== "boolean") {
            return res.status(400).json({
                error: "completed must be true or false."
            });
        }

        const status = completed
            ? "completed"
            : "in_progress";

        const projectResult = await pool.query(
            `
            SELECT
                id,
                name
            FROM projects
            WHERE id = $1;
            `,
            [projectId]
        );

        if (projectResult.rows.length === 0) {
            return res.status(400).json({
                error: "Project not found."
            });
        }

        const result = await pool.query(
            `
            UPDATE tasks
            SET
                title = $1,
                project_id = $2,
                status = $3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING
                id,
                project_id AS "projectId",
                title,
                status,
                created_at AS "createdAt",
                updated_at AS "updatedAt";
            `,
            [
                title.trim(),
                projectId,
                status,
                taskId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found."
            });
        }

        const task = result.rows[0];

        res.json({
            id: task.id,
            title: task.title,
            projectId: task.projectId,
            projectName: projectResult.rows[0].name,
            status: task.status,
            completed: task.status === "completed",
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        });
    } catch (error) {
        console.error("Failed to update task.");

        res.status(500).json({
            error: "Unable to update task."
        });
    }
});


/* =========================
   DELETE TASK
   ========================= */

app.delete("/api/tasks/:id", async function (req, res) {
    try {
        const taskId = Number(req.params.id);

        if (!Number.isInteger(taskId)) {
            return res.status(400).json({
                error: "Task id must be a number."
            });
        }

        const result = await pool.query(
            `
            DELETE FROM tasks
            WHERE id = $1
            RETURNING id;
            `,
            [taskId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found."
            });
        }

        res.json({
            message: "Task deleted successfully.",
            id: result.rows[0].id
        });
    } catch (error) {
        console.error("Failed to delete task.");

        res.status(500).json({
            error: "Unable to delete task."
        });
    }
});


/* =========================
   START SERVER
   ========================= */

async function startServer() {
    try {
        await pool.query("SELECT 1");

        console.log("Database connected successfully.");

        app.listen(PORT, function () {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "Database connection failed. Check your DATABASE_URL and make sure PostgreSQL is running."
        );
    }
}

startServer();